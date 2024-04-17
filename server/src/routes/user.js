import express from "express";
import { getRegisteredUsers, registerUser } from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";

const router = express.Router();

router.post("/login", tryCatch(getRegisteredUsers));

router.post("/register", tryCatch(registerUser));

export default router;
