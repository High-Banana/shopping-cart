import { checkoutUser } from "../services/api/CheckoutAPI";

export async function handleCartCheckout(data) {
  const { userID, productDetails } = data;
  console.log(userID, productDetails);
  try {
    checkoutUser({ userID, productDetails });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    console.log("handle cart checkout");
  }
}
