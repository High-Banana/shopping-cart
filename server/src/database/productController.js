import { v4 as uuidv4 } from "uuid";
import database from "./db.js";

export async function getAllProducts(req, res, next) {
  try {
    const [products] = await database.query("select * from products");
    if (products.length === 0) throw new Error("404 Error");
    res.send(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductByID(req, res, next) {
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
}

export async function addProduct(req, res, next) {
  const { productName, productDescription, productType } = req.body;
  const productImage = req.file.filename;
  const stockID = req.params.stockID;
  console.log(stockID);
  try {
    // check if product is in the stock or not
    const [stockProductCheck] = await database.query("select * from stock where product_name = ?", [productName]);
    if (stockProductCheck.length === 0) return res.status(404).send("Product is not available in stock.");

    const [product] = await database.query("select * from products where product_name = ?", [productName]);
    if (product.length !== 0) return res.status(409).send("Product has already been added.");

    // to sell at double price
    const productPrice = parseFloat(stockProductCheck[0].product_price) * 2;
    const productQuantity = parseInt(stockProductCheck[0].product_quantity);
    const productUUID = uuidv4();

    await database.query(
      "insert into products (product_name, product_description, product_price, product_quantity, image, product_type, uuid, stock_id) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [productName, productDescription, productPrice, productQuantity, productImage, productType, productUUID, stockID]
    );
    res.status(200).send({ productUUID, productType, message: "product-added" });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  const { productName, productDescription, productType } = req.body;
  const productId = req.params.productID;
  let productImage;

  if (req.file !== undefined) {
    productImage = req.file.filename;
  }

  let sqlQuery = "update products set product_name = ? , product_description = ?, product_type = ?";
  const sqlValues = [productName, productDescription, productType];

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

export async function deleteProduct(req, res, next) {
  const productId = req.params.productID;
  database
    .query("delete from products where uuid = ?", productId)
    .then(() => {
      res.send({ message: "product-deleted" });
    })
    .catch((error) => next(error));
}
