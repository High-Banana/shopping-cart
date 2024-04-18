import { v4 as uuidv4 } from "uuid";
import database from "./db.js";

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
  res.json({ message: "Product added" });
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

  res.json({ message: "Product updated" });
}

async function deleteProduct(req, res) {
  const productId = req.params.productID;
  database.query("delete from products where uuid = ?", productId);
  res.json({ message: "Product deleted" });
}

async function getRegisteredUsers(req, res, next) {
  const { email, password } = req.body;
  const [user] = await database.query("select * from users where email = ? AND password = ? LIMIT 1", [email, password]);
  if (user.length === 0) res.status(401).send("Email or password is invalid.");
  else res.send(user);
  return user;
}

async function registerUser(req, res, next) {
  const { email, username, password } = req.body;
  const [user] = await database.query("select * from users where email = ?", [email]);
  if (user.length !== 0) return res.status(409).send("Email is already registered");
  try {
    await database.query("insert into users (username, email, password, isAdmin) VALUES (?,?,?,?)", [
      username,
      email,
      password,
      false,
    ]);
    const registeredUser = await getRegisteredUsers(req, res);
    res.status(200).send(registeredUser);
  } catch (error) {
    next(error);
  }
}

export async function addUserAndProductID(req, res, next) {
  const { userID, productDetails } = req.body;
  try {
    for (let i = 0; i < productDetails.length; i++) {
      await database.query("insert into users_products (user_id, product_id, quantity) values (?, ?, ?)", [
        userID,
        productDetails[i].id,
        productDetails[i].quantity,
      ]);
    }
  } catch (error) {
    next(error);
  }
  res.status(200).send("user and product id");
}

export { getAllProducts, getProductByID, addProduct, getRegisteredUsers, registerUser, updateProduct, deleteProduct };
