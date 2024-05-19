/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ProductsList from "./ProductsList";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error";
import SortItems from "./SortItems";
import useProductAPI from "../../../hooks/useProductAPI";
import FilterItems from "./FilterItems";
import { productFetchType } from "../../../services/constants";
import { useLocation } from "react-router-dom";

export default function ProductPage() {
  const { items: products, isLoading, errorState: error, fetchItems } = useProductAPI();
  const [sortType, setSortType] = React.useState("ascendingPrice");
  const [filterType, setFilterType] = React.useState(null);
  const location = useLocation();

  function handleSearch() {
    const searchValue = location.search.substring(location.search.indexOf("=") + 1);
    fetchItems({ searchValue: searchValue, fetchType: productFetchType.SEARCH });
    setFilterType(null);
  }

  React.useEffect(() => {
    if (filterType === null && location.search === "") fetchItems({ fetchType: productFetchType.ALL });
    else if (filterType !== null) fetchItems({ category: filterType, fetchType: productFetchType.PRODUCT_CATEGORY });

    if (location.search !== "") handleSearch();
  }, [sortType, filterType, location.search]);

  if (error)
    return <Error errorDetail={error} onClickFunction={() => fetchItems({ productID: null, fetchType: productFetchType.ALL })} />;

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
