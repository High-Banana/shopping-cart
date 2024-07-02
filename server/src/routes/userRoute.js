import express from "express";
// import { getRegisteredUsers, registerUser, verifyUser } from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";
import { getRegisteredUsers, registerUser, verifyUser } from "../database/userController.js";

const router = express.Router();

router.post("/login", tryCatch(getRegisteredUsers));

router.post("/register", tryCatch(registerUser));

router.get("/confirmation/:emailToken", tryCatch(verifyUser));

export default router;
