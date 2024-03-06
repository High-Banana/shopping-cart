import express from "express";
import { getAllProducts, getProductByID } from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";

const router = express.Router();

router.get("/", tryCatch(getAllProducts));

router.get("/:productType/:productID", tryCatch(getProductByID));

export default router;
