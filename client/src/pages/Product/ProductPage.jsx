/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { fetchApi } from "../../services/api/Fetch";
import Loading from "../../components/Loading/Loading";

export default function ProductPage() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchApi()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h1>Products</h1>
      {isLoading ? <Loading /> : <Card products={products} />}
    </>
  );
}
