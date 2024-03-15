/* eslint-disable react-hooks/exhaustive-deps */
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/Error";
import { useState } from "react";

export default function ProductPage() {
  const { item: products, isLoading, errorState: error, fetchItems } = useFetch();
  const [sortState, setSortState] = useState("ascendingPrice");

  if (error) return <Error errorDetail={error} onClickFunction={() => fetchItems()} />;

  return (
    <div className="mx-[50px]">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-[50px] mt-[20px] flex justify-between px-5">
            <h1 className="font-[700] text-[20px]">{products.length} items</h1>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Sort by: </span>
              <select className="bg-transparent font-bold p-1 bg-[#cecece]" onChange={(e) => setSortState(e.target.value)}>
                <option value="ascendingPrice">Price High to Low</option>
                <option value="descendingPrice">Price Low to High</option>
                <option value="ascendingLetter">A - Z</option>
                <option value="descendingLetter">Z - A</option>
                {/* <option value="popularity">Popularity</option> */}
              </select>
            </div>
          </div>
          <Card products={products} sortState={sortState} />
        </>
      )}
    </div>
  );
}
