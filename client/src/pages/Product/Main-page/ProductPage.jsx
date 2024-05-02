/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ProductsList from "./ProductsList";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error";
import SortItems from "./SortItems";
import useProductAPI from "../../../hooks/useProductAPI";
import FilterItems from "./FilterItems";

export default function ProductPage() {
  const { items: products, isLoading, errorState: error, fetchItems } = useProductAPI();
  const [sortType, setSortType] = React.useState("ascendingPrice");

  React.useEffect(() => {
    fetchItems();
  }, [sortType]);

  if (error) return <Error errorDetail={error} onClickFunction={() => fetchItems()} />;

  return (
    <div className="relative">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-[10px] flex gap-4">
          <FilterItems />
          <div className="flex flex-col gap-[40px]">
            <div className="flex justify-between mt-[20px]">
              <h1 className="font-[700] text-[20px]">{products.length} items</h1>
              <SortItems sortType={sortType} setSortType={setSortType} />
            </div>
            <ProductsList products={products} sortType={sortType} />
          </div>
        </div>
      )}
    </div>
  );
}
