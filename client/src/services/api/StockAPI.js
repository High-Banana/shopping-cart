import axios from "axios";
import { HEADERS } from "../constants";

export async function fetchStockProducts() {
  return axios
    .get(`/api/stock`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function addToStock(formData) {
  return axios
    .post("/api/stock/add-stock", formData, HEADERS)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function updateStock(formData, productID) {
  return axios
    .put(`/api/stock/update-stock/${productID}`, formData, HEADERS)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}

export async function fetchAddedProducts() {
  return axios
    .get("/api/stock/added-products")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      Promise.reject(error);
    });
}
