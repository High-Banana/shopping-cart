/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import propTypes from "prop-types";
import { useProductFormProvider } from "../../context/ProductFormContext";
import InputField from "./InputField";
import { productFormFillup, productSubmitType } from "../../services/constants";

export default function StockForm({ productInfo }) {
  const { dispatch, productFormDetail, productFormError } = useProductFormProvider();

  React.useEffect(() => {
    // if the form is opened to update the stock, the product's details will be set as initial value for form
    if (productFormDetail.formSubmitType === productSubmitType.UPDATE_STOCK) {
      dispatch({ type: productFormFillup.SET_PRODUCT_NAME, payload: productInfo.product_name });
      dispatch({ type: productFormFillup.SET_PRODUCT_TYPE, payload: productInfo.product_type });
      dispatch({ type: productFormFillup.SET_PRODUCT_PRICE, payload: productInfo.product_price });
      dispatch({ type: productFormFillup.SET_PRODUCT_QUANTITY, payload: productInfo.product_quantity });
    }
  }, []);

  return (
    <>
      <InputField
        label="Product Name"
        type="text"
        attributes={{
          placeholder: "ASUS Nitro 5",
          name: "productName",
          defaultValue: productFormDetail.formSubmitType === productSubmitType.UPDATE_STOCK ? productInfo.product_name : "",
        }}
        setValue={(value) => dispatch({ type: productFormFillup.SET_PRODUCT_NAME, payload: value })}
        errorState={productFormError.name}
      />
      <InputField
        label="Product Category"
        type="text"
        attributes={{
          placeholder: "Laptop",
          name: "productCategory",
          defaultValue: productFormDetail.formSubmitType === productSubmitType.UPDATE_STOCK ? productInfo.product_type : "",
        }}
        setValue={(value) => dispatch({ type: productFormFillup.SET_PRODUCT_TYPE, payload: value })}
        errorState={productFormError.type}
      />
      <InputField
        label="Stock Price"
        type="number"
        attributes={{
          placeholder: "Enter number only",
          name: "productPrice",
          product_price: "",
          defaultValue: productFormDetail.formSubmitType === productSubmitType.UPDATE_STOCK ? productInfo.product_price : "",
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
          defaultValue: productFormDetail.formSubmitType === productSubmitType.UPDATE_STOCK ? productInfo.product_quantity : "",
        }}
        setValue={(value) => dispatch({ type: productFormFillup.SET_PRODUCT_QUANTITY, payload: value })}
        errorState={productFormError.quantity}
      />
    </>
  );
}

StockForm.propTypes = {
  productInfo: propTypes.object,
};
