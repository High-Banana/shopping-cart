import database from "./db.js";

export async function addUserAndProductID(req, res, next) {
  const { userID, productDetails, totalPrice } = req.body;
  console.log(totalPrice, userID, productDetails);
  try {
    for (let i = 0; i < productDetails.length; i++) {
      await database.query("insert into transaction (user_id, product_id, quantity, total_price) values (?, ?, ?, ?)", [
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

export async function getAddedProduct(req, res, next) {
  try {
    const [products] = await database.query(
      "select stock.id, stock.product_name, stock.product_price * 2 as product_price, stock.product_quantity, stock.product_type, case when products.stock_id is not null then true else false end as isProductAdded from stock left join products on stock.id=products.stock_id;"
    );
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
}

export async function manageQuantity(req, res, next) {
  const { id, quantity } = req.body[0];
  console.log(id, quantity);

  try {
    await database.query(
      "UPDATE stock SET product_quantity = product_quantity - ? WHERE id = ?; " +
        "UPDATE products SET product_quantity = product_quantity - ? WHERE stock_id = ?",
      [parseFloat(quantity), id, parseFloat(quantity), id]
    );
    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    next(error);
  }
}

// getAddedProduct();

// select users.username, products.product_name, products.product_price
// from users_products
// join users on users_products.user_id = users.userId
// join products on users_products.product_id = products.id
// where users_products.user_id = 45 and users_products.product_id in (51, 2);
