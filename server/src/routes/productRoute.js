import express from "express";
import { tryCatch } from "../helper/helper.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  getProductBySearch,
  getProductByType,
  updateProduct,
} from "../database/productController.js";
import upload from "../middleware/multerConfig.js";

const product = express.Router();

product.post("/add-product", upload.single("productImage"), tryCatch(addProduct));

product.put("/edit-product/:productID", upload.single("productImage"), tryCatch(updateProduct));

product.delete("/delete-product/:productID", tryCatch(deleteProduct));

product.get("/filter/:productType", tryCatch(getProductByType));

product.get("/search", tryCatch(getProductBySearch));

product.get("/product/:productID", tryCatch(getProductByID));

product.get("/", tryCatch(getAllProducts));

export default product;
