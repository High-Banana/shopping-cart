import express from "express";
import imageRouter from "./routes/imageRoute.js";
import productRouter from "./routes/productRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import stockRouter from "./routes/stockRoute.js";

const app = express();

app.use(express.json());

app.use("/db_images", imageRouter);

app.use("/api/products", productRouter);

app.use("/api/stock", stockRouter);

app.use("/api/users", userRouter);

app.use("/api/cart", orderRouter);

app.use(errorHandler);

export default app;
