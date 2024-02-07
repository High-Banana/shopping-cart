import express from "express";
import imageRouter from "./routes/imageRoute.js";
import productRouter from "./routes/product.js";
const app = express();

// app.use("/db_images", express.static("./db_images"));

app.use("/db_images", imageRouter);

app.use("/api/products", productRouter);

export default app;
