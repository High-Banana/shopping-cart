import database from "./db.js";

export async function getStockProducts(req, res, next) {
  try {
    const [stockProducts] = await database.query("select * from stock");
    if (stockProducts.length === 0) throw new Error("404 Error");
    else res.status(200).send(stockProducts);
  } catch (error) {
    next(error);
  }
}

export async function addProductToStock(req, res, next) {
  const { productName, productPrice, productQuantity, productType } = req.body;
  await database
    .query("insert into stock (product_name, product_price, product_type, product_quantity) values(?, ?, ?, ?)", [
      productName,
      productPrice,
      productType,
      productQuantity,
    ])
    .then(() => res.status(200).json("stock-added"))
    .catch((error) => next(error));
}

export async function updateStock(req, res, next) {
  const { productName, productPrice, productQuantity, productType } = req.body;
  const productId = req.params.productID;
  await database
    .query("update stock set product_name = ?, product_price = ?, product_type=?, product_quantity = ? where id = ?", [
      productName,
      productPrice,
      productType,
      productQuantity,
      productId,
    ])
    .then(() => res.status(200).json("stock-updated"))
    .catch((error) => next(error));
}
