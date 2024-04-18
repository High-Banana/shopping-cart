import express from "express";
import { tryCatch } from "../helper/helper.js";
import { addUserAndProductID } from "../database/queries.js";

const router = express.Router();

router.post("/", tryCatch(addUserAndProductID));

export default router;
