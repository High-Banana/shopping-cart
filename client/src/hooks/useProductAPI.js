/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { addProduct, deleteProduct, fetchAllProducts, fetchProductByID, updateProduct } from "../services/api/ProductAPI";

export default function useProductAPI() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);

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
    try {
      if (submitType === "add") await addProduct(formData);
      else if (submitType === "edit") await updateProduct(formData, productID);
      else if (submitType === "delete") await deleteProduct(productID);
    } catch (error) {
      console.log(error);
      setErrorState(error);
    } finally {
      setIsLoading(false);
    }
    // else if(submitType === "edit")
    // else if(submitType === "delete")
  }

  // useEffect(() => {
  //   fetchItems();
  // }, [productID, isSubmitted]);

  return { items, isLoading, errorState, fetchItems, submitProductForm };
}
