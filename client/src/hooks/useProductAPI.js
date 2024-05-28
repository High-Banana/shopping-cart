/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  addProduct,
  addToStock,
  deleteProduct,
  fetchAllProducts,
  fetchFilteredProducts,
  fetchProductByID,
  fetchSearchedProducts,
  fetchStockProducts,
  updateProduct,
  updateStock,
} from "../services/api/ProductAPI";
import { productFetchType, productSubmitType } from "../services/constants";

export default function useProductAPI() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorState, setErrorState] = React.useState(null);

  async function fetchItems({ productID = null, category = null, searchValue = null, fetchType }) {
    setErrorState(null);
    setIsLoading(true);
    try {
      let products;
      switch (fetchType) {
        case productFetchType.ALL:
          products = await fetchAllProducts();
          break;
        case productFetchType.PRODUCT_ID:
          products = await fetchProductByID(productID);
          break;
        case productFetchType.PRODUCT_CATEGORY:
          products = await fetchFilteredProducts(category);
          break;
        case productFetchType.SEARCH:
          products = await fetchSearchedProducts(searchValue);
          break;
        case productFetchType.STOCK:
          products = await fetchStockProducts();
          break;
        default:
          throw new Error(`Invalid fetch type: ${fetchType}`);
      }
      setItems(products);
    } catch (error) {
      console.log(error);
      setErrorState(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitProductForm(formData, submitType, productID) {
    setErrorState(null);
    setIsLoading(true);
    // console.log(submitType);
    // console.log(productID);
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    try {
      switch (submitType) {
        case productSubmitType.ADD_PRODUCT:
          return await addProduct(formData);
        case productSubmitType.UPDATE_PRODUCT:
          return await updateProduct(formData, productID);
        case productSubmitType.DELETE_PRODUCT:
          return await deleteProduct(productID);
        case productSubmitType.ADD_TO_STOCK:
          return await addToStock(formData);
        case productSubmitType.UPDATE_STOCK:
          return await updateStock(formData, productID);
        default:
          throw new Error(`Invalid submit type : ${submitType}`);
      }
    } catch (error) {
      console.log(error);
      setErrorState(error);
    } finally {
      setIsLoading(false);
    }
  }
  return { items, isLoading, errorState, fetchItems, submitProductForm };
}
