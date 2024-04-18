import axios from "axios";
import { HEADERS } from "../constants";

export async function checkoutUser(data) {
  //   const { userID, productID } = data;
  console.log(data);
  axios
    .post("/api/cart", data, { headers: { "Content-Type": "application/json" } })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
