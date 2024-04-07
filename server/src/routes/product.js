import express from "express";
import { addProduct, getAllProducts, getProductByID, updateProduct } from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/", tryCatch(getAllProducts));

router.get("/:productType/:productID", tryCatch(getProductByID));

router.post("/add-product", upload.single("productImage"), tryCatch(addProduct));

router.put("/edit-product/:productID", upload.single("productImage"), tryCatch(updateProduct));

router.get("/add-product", (req, res) => {
  res.status(200).send({ message: "ok" });
});

export default router;
