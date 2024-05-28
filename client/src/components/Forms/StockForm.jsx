/* eslint-disable react-hooks/exhaustive-deps */
import { useProductFormProvider } from "../../context/ProductFormContext";
import InputField from "./InputField";
import { productFormFillup, productSubmitType } from "../../services/constants";
import React from "react";

export default function StockForm() {
  const { dispatch, productFormDetail, productFormError } = useProductFormProvider();

  React.useEffect(() => {
    console.log(productFormDetail);
  }, []);

  return (
    <>
      <InputField
        label="Product Name"
        type="text"
        attributes={{
          placeholder: "ASUS Nitro 5",
          name: "productName",
          // defaultValue: productFormDetail.formSubmitType === productSubmitType.UPDATE_PRODUCT ? productInfo.product_name : "",
        }}
        setValue={(value) => dispatch({ type: productFormFillup.SET_PRODUCT_NAME, payload: value })}
        errorState={productFormError.name}
      />
      <InputField
        label="Stock Price"
        type="number"
        attributes={{
          placeholder: "Enter number only",
          name: "productPrice",
          product_price: "",
        }}
        setValue={(value) => dispatch({ type: productFormFillup.SET_PRODUCT_PRICE, payload: value })}
        errorState={productFormError.price}
      />
      <InputField
        label="Product Quantity"
        type="number"
        attributes={{
          placeholder: "Enter number only",
          name: "productQuantity",
          product_quantity: "",
        }}
        setValue={(value) => dispatch({ type: productFormFillup.SET_PRODUCT_QUANTITY, payload: value })}
        errorState={productFormError.quantity}
      />
    </>
  );
}
