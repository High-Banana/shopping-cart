/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ProductsList from "./ProductsList";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error";
import SortItems from "./SortItems";
import useProductAPI from "../../../hooks/useProductAPI";

export default function ProductPage() {
  const { items: products, isLoading, errorState: error, fetchItems } = useProductAPI();
  const [sortType, setSortType] = React.useState("ascendingPrice");

  React.useEffect(() => {
    fetchItems();
  }, [sortType]);

  if (error) return <Error errorDetail={error} onClickFunction={() => fetchItems()} />;

  return (
    <div className="mx-[50px]">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-[50px] mt-[20px] flex justify-between px-5">
            <h1 className="font-[700] text-[20px]">{products.length} items</h1>
            <SortItems sortType={sortType} setSortType={setSortType} />
          </div>
          <ProductsList products={products} sortType={sortType} />
        </>
      )}
    </div>
  );
}
