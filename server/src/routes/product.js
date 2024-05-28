import express from "express";
import {
  addProduct,
  addProductToStock,
  deleteProduct,
  getAllProducts,
  getProductByID,
  getProductBySearch,
  getProductByType,
  getStockProducts,
  updateProduct,
} from "../database/queries.js";
import { tryCatch } from "../helper/helper.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/stock", tryCatch(getStockProducts));

router.post("/stock/add-stock", upload.any(), tryCatch(addProductToStock));

router.get("/filter/:productType", tryCatch(getProductByType));

router.get("/:productType/:productID", tryCatch(getProductByID));

router.get("/search", tryCatch(getProductBySearch));

router.post("/add-product", upload.single("productImage"), tryCatch(addProduct));

router.put("/edit-product/:productID", upload.single("productImage"), tryCatch(updateProduct));

router.delete("/delete-product/:productID", tryCatch(deleteProduct));

router.get("/", tryCatch(getAllProducts));

export default router;
