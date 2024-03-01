/* eslint-disable react-hooks/exhaustive-deps */
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { Outlet } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/Error";

export default function ProductPage() {
  const [products, isLoading, error] = useFetch();

  if (error) return <Error />;

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
