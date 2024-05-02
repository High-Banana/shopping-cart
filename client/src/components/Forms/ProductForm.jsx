import React from "react";
import PropTypes from "prop-types";
import InputField from "../../components/Forms/InputField";
import SelectField from "../../components/Forms/SelectField";
import TextAreaField from "../../components/Forms/TextAreaField";
import { useProductFormProvider } from "../../context/ProductFormContext";
import { productTypes } from "../../services/product";
/* eslint-disable react-hooks/exhaustive-deps */

export default function ProductForm({ productInfo }) {
  const { dispatch, productFormError, productFormDetail } = useProductFormProvider();

  React.useEffect(() => {
    // if the form is opened to update the product, the product's details will be set as initial value
    if (productFormDetail.formSubmitType === "EDIT") {
      dispatch({ type: "SET_PRODUCT_NAME", payload: productInfo.product_name });
      dispatch({ type: "SET_PRODUCT_PRICE", payload: productInfo.product_price });
      dispatch({ type: "SET_PRODUCT_TYPE", payload: productInfo.product_type });
      dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: productInfo.product_description });
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
          defaultValue: productFormDetail.formSubmitType === "EDIT" ? productInfo.product_name : "",
        }}
        setValue={(value) => dispatch({ type: "SET_PRODUCT_NAME", payload: value })}
        errorState={productFormError.name}
      />
      <InputField
        label="Product Image"
        attributes={{ accept: ".png, .jpg, .jpeg, .gif, .webp", name: "productImage" }}
        type="file"
        setValue={(value) => dispatch({ type: "SET_PRODUCT_IMAGE", payload: value })}
        errorState={productFormError.image}
      />
      <InputField
        label="Product Price"
        type="number"
        attributes={{
          placeholder: "Enter number only",
          name: "productPrice",
          defaultValue: productFormDetail.formSubmitType === "EDIT" ? productInfo.product_price : "",
        }}
        setValue={(value) => dispatch({ type: "SET_PRODUCT_PRICE", payload: value })}
        errorState={productFormError.price}
      />
      <SelectField
        label="Product Type"
        type="text"
        attributes={{
          name: "productType",
          defaultValue: productFormDetail.formSubmitType === "EDIT" ? productInfo.product_type : "",
        }}
        options={productTypes}
        setValue={(value) => dispatch({ type: "SET_PRODUCT_TYPE", payload: value })}
        errorState={productFormError.type}
      />
      <TextAreaField
        label="Product Description"
        className="h-[200px] rounded-md p-3 resize-none overflow-hidden focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
        attributes={{
          placeholder: "Features about product",
          name: "productDescription",
          defaultValue: productFormDetail.formSubmitType === "EDIT" ? productInfo.product_description : "",
        }}
        setValue={(value) => dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: value })}
        errorState={productFormError.description}
      />
    </>
  );
}

ProductForm.propTypes = {
  productInfo: PropTypes.object,
};
