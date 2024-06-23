/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useProductAPI from "../../hooks/useProductAPI";
import { productFetchType } from "../../services/constants";
import Loading from "../../components/Loading/Loading";

export default function AddProduct() {
  const { fetchItems, items, isLoading } = useProductAPI();

  React.useEffect(() => {
    fetchItems({ fetchType: productFetchType.ADDED_PRODUCTS });
    console.log(items);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-[20px] min-h-dvh">
      <h1 className="text-3xl font-semibold capitalize">Add Product</h1>
      <div className="mr-4">
        <table className="min-w-full divide-y divide-gray-200 mt-10 mr-4">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black w-1">
                S.N.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Quantity
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Add Product
                </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                Is Product Added
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Add Product
              </th>
            </tr>
          </thead>
          <tbody className="bg-[black] text-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white w-1">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_type}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_price}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_quantity}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap border-r border-white ${
                    item.isProductAdded === 1 ? "bg-green-600" : "bg-red-600"
                  }`}>
                  {item.isProductAdded === 1 ? "True" : "False"}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap border-r border-white text-center">
                  <button
                  className="bg-white text-black px-[8px] py-1 rounded-sm hover:bg-[gray] hover:text-white transition-all duration-200"
                  onClick={() => handleUpdateStock(item)}>
                  Add Product
                  </button>
                  </td> */}
                {/* <td className="px-6 py-4 whitespace-nowrap border-r border-white text-center">
                <button
                  className="bg-white text-black px-[8px] py-1 rounded-sm hover:bg-[gray] hover:text-white transition-all duration-200"
                  onClick={() => handleUpdateStock(item)}>
                  Update
                  </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-white text-center">
                  <button
                  className="bg-white text-black px-[8px] py-1 rounded-sm hover:bg-[gray] hover:text-white transition-all duration-200"
                  onClick={() => handleUpdateStock(item)}>
                  Delete
                  </button>
                  </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
