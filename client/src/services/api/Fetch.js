import axios from "axios";

export async function fetchAllProducts() {
  return axios
    .get("/api/products")
    .then((response) => {
      return response.data;
    })
    .catch((error) => Promise.reject(error));
}

export async function fetchProductByID(productID) {
  return axios
    .get(`/api/products/product/${productID}`)
    .then((response) => {
      if (response.data.length === 0) throw new Error("No data was found");
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
