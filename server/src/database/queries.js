import { v4 as uuidv4 } from "uuid";
import database from "./db.js";

async function getAllProducts(req, res, next) {
  try {
    const [products] = await database.query("select * from products");
    if (products.length === 0) throw new Error("Products could not load");
    res.send(products);
  } catch (error) {
    next(`An error occured: ${error}`);
  }
}

async function getProductByID(req, res, next) {
  const productID = req.params.productID;
  try {
    const [product] = await database.query("select * from products where id = ?", [productID]);
    if (product.length === 0) throw new Error("Product not found");
    else res.send(product);
  } catch (error) {
    next(error);
  }
}

async function addProduct(name, description, price, image, type) {
  await database.query("insert into products values(?, ?, ?, ?, ?, ?)", [uuidv4(), name, description, price, image, type]);
}

// addProduct(
//   "iPhone 14 Pro Max",
//   "The iPhone 14 Pro Max, introduced in 2022, is a flagship device from Apple that boasts a multitude of advanced features. The phone comes with a 6.7-inch Super Retina XDR OLED display with a resolution of 1290 x 2796 pixels, offering vibrant and sharp visuals12. The display supports HDR10, Dolby Vision, and has a high brightness level of up to 2000 nits12. It also features ProMotion technology with adaptive refresh rates up to 120Hz2.\n Under the hood, the iPhone 14 Pro Max is powered by Apple’s A16 Bionic chip, which is built on a 4 nm process13. This hexa-core CPU includes two performance cores and four efficiency cores, providing a balance of power and energy efficiency3. The phone also features a 5-core GPU and a 16-core Neural Engine for advanced machine learning tasks3.\n In terms of storage, the iPhone 14 Pro Max offers several options: 128GB, 256GB, 512GB, and 1TB12. However, it does not support expandable storage via a card slot1. \n The iPhone 14 Pro Max stands out in the camera department. It features a triple camera setup on the rear, including a 48 MP main camera with sensor-shift OIS, a 12 MP ultra-wide camera, and a 12 MP telephoto camera12. The phone also features a 12 MP front camera for selfies1. The camera system supports 4K video recording, HDR, and has a Photonic Engine for enhanced image processing2.",
//   214300.0,
//   "iphone-15-pro-max.jpg",
//   "Mobile"
// );

export { getAllProducts, getProductByID, addProduct };
