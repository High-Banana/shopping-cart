import express from "express";
import { getAllProducts, getProductByID } from "../database/queries.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await getAllProducts());
});

router.get("/:productType/:productID", async (req, res, next) => {
  // res.send(await getProductByID(req.params.productID, req.params.productType));
  try {
    const data = await getProductByID(req.params.productID);
    if (data.length === 0) {
      throw new Error("404 Error");
    } else res.send(data);
  } catch (error) {
    next(error);
    // console.log(error);
  }
});

export default router;
