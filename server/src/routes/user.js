import express from "express";
import { getRegisteredUsers } from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";

const router = express.Router();

router.get("/login", tryCatch(getRegisteredUsers));

router.post("/login", async (req, res, next) => await getRegisteredUsers(req, res, next));

export default router;
