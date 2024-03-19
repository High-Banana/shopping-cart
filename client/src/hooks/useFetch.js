import { useEffect, useState } from "react";
import { fetchAllProducts, fetchProductByID } from "../services/api/Fetch";

export default function useFetch(productID) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState();

  async function fetchItems(productID) {
    setErrorState(undefined);
    const products = productID === undefined ? fetchAllProducts() : fetchProductByID(productID);
    console.log(products);
    products
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => setErrorState(error));
  }

  useEffect(() => {
    fetchItems(productID);
  }, [productID]);

  return { items, isLoading, errorState, fetchItems };
}
