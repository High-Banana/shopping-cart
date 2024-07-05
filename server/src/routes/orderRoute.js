import express from "express";
import { tryCatch } from "../helper/helper.js";
import { addUserAndProductID, manageQuantity } from "../database/queries.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.post("/", tryCatch(addUserAndProductID));

router.put("/quantity", upload.any(), tryCatch(manageQuantity));

export default router;
