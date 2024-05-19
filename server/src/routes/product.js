import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  getProductByType,
  updateProduct,
} from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/", tryCatch(getAllProducts));

router.get("/:productType/:productID", tryCatch(getProductByID));

router.get("/:productType", tryCatch(getProductByType));

router.get("/search", async (req, res) => {
  console.log(req.query);
  console.log("huh");
});

router.post("/add-product", upload.single("productImage"), tryCatch(addProduct));

router.put("/edit-product/:productID", upload.single("productImage"), tryCatch(updateProduct));

router.delete("/delete-product/:productID", tryCatch(deleteProduct));

export default router;
