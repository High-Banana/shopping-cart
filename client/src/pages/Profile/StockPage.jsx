/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useProductAPI from "../../hooks/useProductAPI";
import { productFetchType } from "../../services/constants";
import Loading from "../../components/Loading/Loading";

export default function StockPage() {
  const { fetchItems, items, isLoading } = useProductAPI();

  React.useEffect(() => {
    fetchItems({ fetchType: productFetchType.STOCK });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-[20px] min-h-dvh">
      <h1 className="text-3xl font-semibold capitalize">Products available in stock</h1>
      <div className="flex justify-center items-center mt-9 mr-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Stock Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-[black] text-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.product_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
