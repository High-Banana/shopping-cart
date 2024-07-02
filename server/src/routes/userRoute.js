import express from "express";
// import { getRegisteredUsers, registerUser, verifyUser } from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";
import { getRegisteredUsers, registerUser, verifyUser } from "../database/userController.js";

const user = express.Router();

user.post("/login", tryCatch(getRegisteredUsers));

user.post("/register", tryCatch(registerUser));

user.get("/confirmation/:emailToken", tryCatch(verifyUser));

export default user;
