import express from "express";
import imageRouter from "./routes/imageRoute.js";
const app = express();

// app.use("/db_images", express.static("./db_images"));

app.use("/db_images", imageRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

export default app;
