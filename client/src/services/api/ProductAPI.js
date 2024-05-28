import axios from "axios";
import { HEADERS } from "../constants";

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
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function fetchFilteredProducts(productType) {
  console.log(productType);
  return axios
    .get(`/api/products/filter/${productType}`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
      // const customError = {
      //   response: {
      //     status: 404,
      //     statusText: "The product is not available",
      //   },
      // };
      // throw customError;
    });
}

export async function fetchSearchedProducts(searchValue) {
  console.log(searchValue);
  return axios
    .get(`/api/products/search?searchValue=${searchValue}`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function fetchStockProducts() {
  return axios
    .get(`/api/products/stock`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function addProduct(formData) {
  console.log(formData);
  return axios
    .post("/api/products/add-product", formData, HEADERS)
    .then((response) => {
      if (response.status === 200) {
        console.log("product added");
        console.log(response);
        return response;
      } else console.log("failed");
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function updateProduct(formData, productID) {
  return axios
    .put(`/api/products/edit-product/${productID}`, formData, HEADERS)
    .then((response) => {
      if (response.status === 200) {
        console.log("updated product");
        return response;
      } else console.log("failed");
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function deleteProduct(productID) {
  return axios
    .delete(`/api/products/delete-product/${productID}`)
    .then((response) => {
      console.log("product deleted");
      return response;
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}
