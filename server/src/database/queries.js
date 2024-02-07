import { v4 as uuidv4 } from "uuid";
import database from "./db.js";

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

export { getAllProducts, getProduct, addProduct };
