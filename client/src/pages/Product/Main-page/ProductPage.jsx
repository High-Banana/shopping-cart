/* eslint-disable react-hooks/exhaustive-deps */
import Loading from "../../../components/Loading/Loading";
import useFetch from "../../../hooks/useFetch";
import Error from "../../../components/Error";
import { useState } from "react";
import SortItems from "./SortItems";
import ProductsList from "./ProductsList";

export default function ProductPage() {
  const { items: products, isLoading, errorState: error, fetchItems } = useFetch();
  const [sortType, setSortType] = useState("ascendingPrice");

  if (error) return <Error errorDetail={error} onClickFunction={() => fetchItems()} />;

  return (
    <div className="mx-[50px]">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-[50px] mt-[20px] flex justify-between px-5">
            <h1 className="font-[700] text-[20px]">{products.length} items</h1>
            <SortItems setSortType={setSortType} />
          </div>
          <ProductsList products={products} sortType={sortType} />
        </>
      )}
    </div>
  );
}
