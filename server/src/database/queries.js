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

async function getProductByID(productID) {
  try {
    const [product] = await database.query("select * from products where id = ?", [productID]);
    return product;
  } catch (error) {
    return `An error occured: ${error}`;
  }
}

async function addProduct(name, description, price, image, type) {
  await database.query("insert into products values(?, ?, ?, ?, ?, ?)", [uuidv4(), name, description, price, image, type]);
}

// addProduct(
//   "Huawei MateBook X Pro",
//   "The Huawei MateBook X Pro is our pick for the best laptop money can buy in 2018. This is a gorgeously-designed laptop with a stunning screen (albeit with a rather odd aspect ratio), and it comes packed with cutting edge components that allows it to perform brilliantly, and a battery life that runs rings around many of its rivals. It also has a very competitive price, giving you features, design and performance for quite a bit less money.",
//   270000.0,
//   "huawei-matebook-pro.jpg",
//   "Laptop"
// );

export { getAllProducts, getProductByID, addProduct };
