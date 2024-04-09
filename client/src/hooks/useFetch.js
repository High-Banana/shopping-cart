/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchProductByID } from "../services/api/ProductAPI";

export default function useFetch(productID, isSubmitted) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState();

  async function fetchItems() {
    setErrorState(undefined);
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

  useEffect(() => {
    fetchItems();
  }, [productID, isSubmitted]);

  return { items, isLoading, errorState, fetchItems };
}
