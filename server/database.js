import mysql from "mysql2";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use("/db_images", express.static("./db_images"));

dotenv.config();

const database = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllProducts() {
  try {
    const [products] = await database.query("select * from products");
    return products;
  } catch (error) {
    return `An error occured: ${error}`;
  }
}

async function getProduct(productName) {
  try {
    const [product] = await database.query("select * from products where product_name = ?", [productName]);
    return product;
  } catch (error) {
    return `An error occured: ${error}`;
  }
}

async function addProduct(name, description, price, image) {
  await database.query("insert into products values(?, ?, ?, ?, ?)", [uuidv4(), name, description, price, image]);
}

// addProduct(
//   "ASUS ZenBook 14",
//   "14'' Display in 13'' Chassis. 92% Screen-to-Boddy Ratio. 3D IR Camera. Military-grade quality",
//   1000,
//   "./db-images/asus_zenbook_14.png"
// );

app.get("/api/products", async (req, res) => {
  res.send(await getAllProducts());
});

app.get("/api/db_images/:image", (req, res) => {
  const imageName = req.params.image;
  const imagePath = path.join(__dirname, "db_images", imageName);
  fs.readFile(imagePath, (err, data) => {
    if (err) return console.log(err);
    else {
      const base64Image = Buffer.from(data).toString("base64");
      const imgSrcString = "data:image/jpeg;base64," + base64Image;
      res.send(imgSrcString);
    }
  });
});

app.listen(process.env.PORT, () => console.log("listening"));
