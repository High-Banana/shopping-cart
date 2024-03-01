import { useEffect, useState } from "react";
import { fetchAllProducts, fetchProductByID } from "../services/api/Fetch";

export default function useFetch(productID) {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState();

  async function fetchItems(productID) {
    console.log(productID);
    if (productID !== undefined) return await fetchProductByID(productID);
    else return await fetchAllProducts();
  }

  useEffect(() => {
    fetchItems(productID)
      .then((data) => {
        setItem(data);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setErrorState(error);
        console.log(error);
      });
  }, [productID]);

  return [item, isLoading, errorState];
}
