import mysql from "mysql2";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

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
    const [products] = database.query("select * from products");
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

async function addProduct(name, price, description) {
  const id = uuidv4();
  await database.query("insert into products values(?, ?, ?, ?)", [id, name, price, description]);
}

// console.log(await getProduct("L"));
// addProduct("I phone 9", 800, "Mobile phone for future");
