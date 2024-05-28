/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "../../../components/ui/Button";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error";
import Form from "../../../components/Forms/Form";
import ProductForm from "../../../components/Forms/ProductForm";
import useProductAPI from "../../../hooks/useProductAPI";
import { useParams, useNavigate } from "react-router-dom";
import { IMAGE_SRC_PATH } from "../../../services/constants";
import { useCart } from "../../../context/CartContext";
import { useFormContext } from "../../../context/FormContext";
import { useUserContext } from "../../../context/UserContext";
import { useUIContext } from "../../../context/UIContext";
import { useProductFormProvider } from "../../../context/ProductFormContext";
import Navigation from "./Navigation";
import { productFetchType } from "../../../services/constants";

export default function SingleProduct() {
  const { productID } = useParams();
  const { addToCart } = useCart();
  const { userDetails } = useUserContext();
  const { isFormOpen, setIsFormOpen, isDeleteForm, setIsDeleteForm } = useUIContext();
  const { reFetchData, setReFetchData, isProductDeleted, handleProductSubmit, setIsProductDeleted } = useProductFormProvider();
  const navigate = useNavigate();
  const { isLoading: isUpdating } = useFormContext();
  const {
    items: [product],
    isLoading,
    errorState: error,
    fetchItems,
  } = useProductAPI();

  React.useEffect(() => {
    fetchItems({ productID: productID, fetchType: productFetchType.PRODUCT_ID });
    setIsFormOpen(false);
    setIsDeleteForm(false);
    setReFetchData(false);
    console.log(userDetails);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (reFetchData) {
        fetchItems({ productID: productID, fetchType: productFetchType.PRODUCT_ID });
        setReFetchData(false);
      } else if (isProductDeleted) {
        navigate("/products");
        setIsProductDeleted(false);
      }
    }, 200);
  }, [reFetchData, isProductDeleted]);

  if (error !== null)
    return (
      <Error
        errorDetail={error}
        onClickFunction={() => fetchItems({ productID: productID, fetchType: productFetchType.PRODUCT_ID })}
      />
    );
  if (isLoading) return <Loading />;

  return (
    <>
      {
        // after updating product, bring loading animation without disturbing main body until loading is finished
        isUpdating && <Loading />
      }
      <div className="flex flex-col gap-[20px] min-h-[800px]">
        <Navigation productID={productID} />
        <div className="grid grid-cols-[700px_1fr] mx-[10px] gap-[30px] px-[10px] py-[50px]">
          <div className="max-h-[500px] flex items-center rounded-[10px]">
            <img src={`${IMAGE_SRC_PATH}/${product.image}`} className="object-contain max-h-full" alt={product.product_name} />
          </div>
          <div className="flex flex-col gap-[50px] px-[5px]">
            <h1 className="text-3xl font-[500]">{product.product_name}</h1>
            <p className="text-[#3e3e3e] text-[15px] whitespace-pre-wrap break-words max-w-[480px] max-h-[230px] overflow-y-auto custom-scrollbar">
              {product.product_description}
            </p>
            <div className="flex justify-between items-center">
              <span className="font-[700] text-2xl">NPR {parseFloat(product.product_price).toLocaleString()}</span>
              <Button
                title="Add to cart"
                className="bg-[#E20D0D]"
                onClick={() => (userDetails.email === null ? navigate("/login") : addToCart(product))}
              />
            </div>
          </div>
        </div>
        {isFormOpen && (
          <Form values={{ title: "Update Product", handleSubmit: handleProductSubmit }}>
            <ProductForm productInfo={product} />
          </Form>
        )}
        {isDeleteForm && (
          <>
            <Form values={{ title: "Delete Product", handleSubmit: handleProductSubmit }}>
              <h2 className="text-white text-1xl font-bold">Are you sure you want to delete this product?</h2>
            </Form>
          </>
        )}
      </div>
      )
    </>
  );
}
