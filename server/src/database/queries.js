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

export async function getProductByType(req, res, next) {
  const productType = req.params.productType;
  try {
    const [product] = await database.query("select * from products where product_type = ?", [productType]);
    if (product.length === 0) res.send([]);
    else res.send(product);
  } catch (error) {
    next(error);
  }
}

export async function getProductBySearch(req, res, next) {
  const { searchValue } = req.query;
  const query = "SELECT * FROM products WHERE product_name LIKE CONCAT('%', ?, '%') OR product_type = ?";
  try {
    const [products] = await database.query(query, [searchValue, searchValue]);
    if (products.length === 0) res.send([]);
    else res.send(products);
    console.log(products);
  } catch (error) {
    next(error);
  }
  console.log(searchValue);
}

async function addProduct(req, res, next) {
  const { productName, productDescription, productPrice, productType } = req.body;
  const productImage = req.file.filename;
  const productUUID = uuidv4();
  await database
    .query(
      "insert into products (product_name, product_description, product_price, image, product_type, uuid) values (?, ?, ?, ?, ?, ?)",
      [productName, productDescription, productPrice, productImage, productType, productUUID]
    )
    .then(() => {
      res.status(200).send({ productUUID, productType, message: "product-added" });
    })
    .catch((error) => next(error));
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

  await database
    .query(sqlQuery, sqlValues)
    .then(() => {
      res.status(200).send({ message: "product-updated" });
    })
    .catch((error) => next(error));
}

async function deleteProduct(req, res, next) {
  const productId = req.params.productID;
  database
    .query("delete from products where uuid = ?", productId)
    .then(() => {
      res.send({ message: "product-deleted" });
    })
    .catch((error) => next(error));
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
  const { userID, productDetails, totalPrice } = req.body;
  console.log(totalPrice);
  try {
    for (let i = 0; i < productDetails.length; i++) {
      await database.query("insert into users_products (user_id, product_id, quantity, total_price) values (?, ?, ?, ?)", [
        userID,
        productDetails[i].id,
        productDetails[i].quantity,
        totalPrice,
      ]);
    }
    res.status(200).send("user and product id");
  } catch (error) {
    next(error);
  }
}

// select users.username, products.product_name, products.product_price
// from users_products
// join users on users_products.user_id = users.userId
// join products on users_products.product_id = products.id
// where users_products.user_id = 45 and users_products.product_id in (51, 2);

export { getAllProducts, getProductByID, addProduct, getRegisteredUsers, registerUser, updateProduct, deleteProduct };
