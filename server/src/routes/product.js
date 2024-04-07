import express from "express";
import { addProduct, getAllProducts, getProductByID } from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/", tryCatch(getAllProducts));

router.get("/:productType/:productID", tryCatch(getProductByID));

router.post("/add-product", upload.single("productImage"), (req, res) => {
  res.status(200).send({ message: "ok" });
});

router.get("/add-product", (req, res) => {
  res.status(200).send({ message: "ok" });
});

export default router;
