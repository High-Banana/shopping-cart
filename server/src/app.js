import express from "express";
import imageRouter from "./routes/imageRoute.js";
import productRouter from "./routes/product.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

// app.use("/db_images", express.static("./db_images"));

app.use("/db_images", imageRouter);

app.use("/api/products", productRouter);

app.use(errorHandler);

export default app;
