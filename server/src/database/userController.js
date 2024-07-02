import database from "./db.js";
import { sendEmail } from "../utils/verifyEmail.js";
import randomstring from "randomstring";

export async function getRegisteredUsers(req, res, next) {
  const { email, password } = req.body;
  const [user] = await database.query("select * from users where email = ? AND password = ? LIMIT 1", [email, password]);
  if (user.length === 0) res.status(401).send("Email or password is invalid.");
  else res.status(200).send(user);
  return user;
}

export async function registerUser(req, res, next) {
  const { email, username, password, phoneNumber } = req.body;
  const emailToken = randomstring.generate();
  const [user] = await database.query("select * from users where email = ?", [email]);
  if (user.length !== 0) {
    return user[0].isVerified === 1
      ? res.status(409).send("Email is already registered")
      : res.status(409).send("Please check your Email to verify");
  }
  await sendEmail(email, username, emailToken);
  try {
    await database.query(
      "insert into users (username, email, password, phone_number, emailToken, isVerified, isAdmin) VALUES (?,?,?,?,?,?,?)",
      [username, email, password, phoneNumber, emailToken, false, false]
    );
    await getRegisteredUsers(req, res);
  } catch (error) {
    next(error);
  }
}

export async function verifyUser(req, res, next) {
  const { emailToken } = req.params;
  try {
    const [user] = await database.query("select * from users where emailToken = ?", [emailToken]);
    if (user.length > 0) {
      await database.query("update users set isVerified = true, emailToken = null where emailToken = ?", [emailToken]);
      const [verifiedUser] = await database.query("select * from users where userId = ?", [user[0].userId]);
      res.status(200).send(verifiedUser);
    } else res.status(404).json("Email verification failed, invalid token");
  } catch (error) {
    next(error);
  }
}
