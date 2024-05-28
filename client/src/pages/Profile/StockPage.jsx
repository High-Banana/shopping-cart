/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useProductAPI from "../../hooks/useProductAPI";
import { productFetchType, productSubmitType } from "../../services/constants";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/ui/Button";
import { useUIContext } from "../../context/UIContext";
import Form from "../../components/Forms/Form";
import StockForm from "../../components/Forms/StockForm";
import { useProductFormProvider } from "../../context/ProductFormContext";

export default function StockPage() {
  const { fetchItems, items, isLoading } = useProductAPI();
  const { handleFormOpen, isFormOpen } = useUIContext();
  const { dispatch, handleProductSubmit } = useProductFormProvider();
  const [formTitle, setFormTitle] = React.useState("");

  React.useEffect(() => {
    fetchItems({ fetchType: productFetchType.STOCK });
  }, []);

  function handleAddToStock() {
    handleFormOpen();
    dispatch({ type: productSubmitType.ADD_TO_STOCK });
    setFormTitle("Add To Stock");
  }

  function handleUpdateStock() {
    handleFormOpen();
    dispatch({ type: productSubmitType.UPDATE_STOCK });
    setFormTitle("Update Stock");
  }

  if (isLoading) return <Loading />;

  return (
    <div className="mt-[20px] min-h-dvh">
      <h1 className="text-3xl font-semibold capitalize">Products available in stock</h1>
      <div className="flex flex-col justify-center items-center mt-9 mr-4">
        <Button title="Add To Stock" className="bg-[rgb(34,139,184)]" onClick={handleAddToStock} />
        <table className="min-w-full divide-y divide-gray-200 mt-10">
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
                <td className="px-6 py-4 whitespace-nowrap border-r border-white w-1">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-white">{item.product_price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.product_quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-white text-black" onClick={handleUpdateStock}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <Form values={{ title: formTitle, handleSubmit: handleProductSubmit }}>
          <StockForm />
        </Form>
      )}
    </div>
  );
}
