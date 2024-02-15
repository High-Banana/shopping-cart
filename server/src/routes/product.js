import express from "express";
import { getAllProducts, getProductByID } from "../database/queries.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await getAllProducts());
});

router.get("/product/:productID", async (req, res) => {
  res.send(await getProductByID(req.params.productID));
});

export default router;
