/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  fetchFilteredProducts,
  fetchProductByID,
  updateProduct,
} from "../services/api/ProductAPI";
import { productFetchType } from "../services/constants";

export default function useProductAPI() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorState, setErrorState] = React.useState(null);

  async function fetchItems({ productID = null, category = null, fetchType }) {
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
    console.log(submitType);
    console.log(productID);
    try {
      if (submitType === "ADD") return await addProduct(formData);
      else if (submitType === "EDIT") return await updateProduct(formData, productID);
      else if (submitType === "DELETE") return await deleteProduct(productID);
    } catch (error) {
      console.log(error);
      setErrorState(error);
    } finally {
      setIsLoading(false);
    }
  }
  return { items, isLoading, errorState, fetchItems, submitProductForm };
}
