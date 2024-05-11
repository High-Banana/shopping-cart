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
  const [filterType, setFilterType] = React.useState(null);

  React.useEffect(() => {
    if (filterType !== null) fetchItems(null, filterType);
    else fetchItems();
  }, [sortType, filterType]);

  if (error) return <Error errorDetail={error} onClickFunction={() => fetchItems()} />;

  return (
    <div className="relative flex mx-[10px]">
      <FilterItems filterType={filterType} setFilterType={setFilterType} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-[10px] min-h-screen">
          {products.length > 0 ? (
            <div className="flex flex-col gap-[40px]">
              <div className="flex justify-between mt-[20px]">
                <h1 className="font-[700] text-[20px]">
                  {products.length} items {filterType && `- ${filterType}`}
                </h1>
                <SortItems sortType={sortType} setSortType={setSortType} />
              </div>
              <ProductsList products={products} sortType={sortType} />
            </div>
          ) : (
            <p className="text-4xl font-bold mt-[20px]">No items found</p>
          )}
        </div>
      )}
    </div>
  );
}
