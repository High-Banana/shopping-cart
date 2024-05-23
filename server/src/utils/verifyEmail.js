import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: false,
  requireTLS: true,
});

export async function sendEmail(userEmail, username, emailToken) {
  const url = `${process.env.HOST_URL}/users/confirmation/${emailToken}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Confirm Email",
    html: `<p>Hey ${username}, thanks for registering. Please click on the link below to confirm your email</p>
    <br></br>
    <a href=${url}>Click here to confirm your email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
    throw error;
  }

  console.log(userEmail);
}
