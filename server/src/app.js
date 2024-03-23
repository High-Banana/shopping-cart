import express from "express";
import imageRouter from "./routes/imageRoute.js";
import productRouter from "./routes/product.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/user.js";
const app = express();

// app.use("/db_images", express.static("./db_images"));
app.use(express.json());

app.use("/db_images", imageRouter);

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;
