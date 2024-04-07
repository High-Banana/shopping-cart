import { v4 as uuidv4 } from "uuid";
import database from "./db.js";

database.query(`
    CREATE TABLE IF NOT EXISTS product_mapping (
        uuid VARCHAR(36) PRIMARY KEY,
        product_id INT NOT NULL
    );
`);

async function getAllProducts(req, res, next) {
  try {
    const [products] = await database.query("select * from products");
    if (products.length === 0) throw new Error("404 Error");
    res.send(products);
  } catch (error) {
    next(error);
  }
}

async function getProductByID(req, res, next) {
  const productID = req.params.productID;
  try {
    const [product] = await database.query("select * from products where uuid = ?", [productID]);
    if (product.length === 0) throw new Error("404 Error");
    else res.send(product);
  } catch (error) {
    next(error);
  }
}

async function addProduct(req, res, next) {
  const { productName, productDescription, productPrice, productType } = req.body;
  const productImage = req.file.filename;
  await database.query(
    "insert into products (product_name, product_description, product_price, image, product_type, uuid) values (?, ?, ?, ?, ?, ?)",
    [productName, productDescription, productPrice, productImage, productType, uuidv4()]
  );
}

async function updateProduct(req, res, next) {
  const { productName, productDescription, productPrice, productType } = req.body;
  const productId = req.params.productID;
  let productImage;

  if (req.file !== undefined) {
    productImage = req.file.filename;
  }

  let sqlQuery = "update products set product_name = ? , product_description = ?, product_price = ?, product_type = ?";
  const sqlValues = [productName, productDescription, productPrice, productType];

  if (productImage !== undefined) {
    sqlQuery += ", image = ?";
    sqlValues.push(productImage);
  }

  sqlQuery += "where uuid = ?";
  sqlValues.push(productId);

  await database.query(sqlQuery, sqlValues);
}

async function getRegisteredUsers(req, res, next) {
  const { email, password } = req.body;
  const [user] = await database.query("select * from users where email = ? AND password = ? LIMIT 1", [email, password]);
  if (user.length === 0) res.status(401).send("Email or password is invalid.");
  else res.send(user);
  return user;
}

async function registerUser(req, res, next) {
  const { email, userName, password } = req.body;
  console.log({ email, userName, password });
  const [user] = await database.query("select * from users where email = ?", [email]);
  if (user.length !== 0) return res.status(409).send("Email is already registered");
  try {
    await database.query("insert into users (userName, email, password, isAdmin) VALUES (?,?,?,?)", [
      userName,
      email,
      password,
      false,
    ]);
    res.status(200).send("Ok");
  } catch (error) {
    next();
  }
}

// addProduct("name", "description", 111, "iphone-15-pro-max.jpg", "Mobile");

export { getAllProducts, getProductByID, addProduct, getRegisteredUsers, registerUser, updateProduct };
