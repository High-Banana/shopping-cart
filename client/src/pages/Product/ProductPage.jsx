/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { fetchApi } from "../../services/api/Fetch";
import Loading from "../../components/Loading/Loading";
import { Outlet } from "react-router-dom";

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
    <div className="mx-[50px]">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="font-[700] text-[20px]">{products.length} items</h1>
          <Card products={products} />
          <Outlet />
        </>
      )}
    </div>
  );
}
