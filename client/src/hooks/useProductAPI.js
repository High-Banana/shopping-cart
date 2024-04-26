/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { addProduct, deleteProduct, fetchAllProducts, fetchProductByID, updateProduct } from "../services/api/ProductAPI";

export default function useProductAPI() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorState, setErrorState] = React.useState(null);

  async function fetchItems(productID) {
    setErrorState(null);
    setIsLoading(true);
    try {
      const products = productID === undefined ? await fetchAllProducts() : await fetchProductByID(productID);
      setItems(products);
    } catch (error) {
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
