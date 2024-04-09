import axios from "axios";

export async function fetchAllProducts() {
  return axios
    .get("/api/products")
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}

export async function fetchProductByID(productID) {
  return axios
    .get(`/api/products/product/${productID}`)
    .then((response) => {
      if (response.data.length === 0) throw new Error("No data was found");
      else return response.data;
    })
    .catch((error) => Promise.reject(error));
}
