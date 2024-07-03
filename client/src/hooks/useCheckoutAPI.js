import { checkoutUser } from "../services/api/CheckoutAPI";

export async function handleCartCheckout(data) {
  const { userID, productDetails, totalPrice } = data;
  console.log(userID, productDetails, totalPrice);
  try {
    checkoutUser({ userID, productDetails, totalPrice });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    console.log("handle cart checkout");
  }
}
