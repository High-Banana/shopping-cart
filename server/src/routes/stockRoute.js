import express from "express";
import upload from "../middleware/multerConfig.js";
import { tryCatch } from "../helper/helper.js";
import { addProductToStock, getStockProducts, updateStock } from "../database/stockController.js";
import { getAddedProduct } from "../database/queries.js";

const stock = express.Router();

stock.get("/", tryCatch(getStockProducts));

stock.get("/added-products", tryCatch(getAddedProduct));

stock.post("/add-stock", upload.any(), tryCatch(addProductToStock));

stock.put("/update-stock/:productID", upload.any(), tryCatch(updateStock));

export default stock;
