import React from "react";
import PropTypes from "prop-types";
import InputField from "../../components/Forms/InputField";
import SelectField from "../../components/Forms/SelectField";
import TextAreaField from "../../components/Forms/TextAreaField";
import { useFormContext } from "../../context/FormContext";
/* eslint-disable react-hooks/exhaustive-deps */

export default function ProductForm({ productInfo }) {
  const {
    setProductName,
    setProductImage,
    setProductPrice,
    setProductType,
    setProductDescription,
    errorState,
    isAddProductForm,
  } = useFormContext();

  React.useEffect(() => {
    // if the form is opened to update the product, the product's details will be set as initial value
    if (!isAddProductForm) {
      setProductName(productInfo.product_name);
      setProductPrice(productInfo.product_price);
      setProductType(productInfo.product_type);
      setProductDescription(productInfo.product_description);
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
          defaultValue: isAddProductForm ? "" : productInfo.product_name,
        }}
        setValue={setProductName}
        errorState={errorState.name}
      />
      <InputField
        label="Product Image"
        attributes={{ accept: ".png, .jpg, .jpeg, .gif, .webp", name: "productImage" }}
        type="file"
        setValue={setProductImage}
        errorState={errorState.image}
      />
      <InputField
        label="Product Price"
        type="number"
        attributes={{
          placeholder: "Enter number only",
          name: "productPrice",
          defaultValue: isAddProductForm ? "" : productInfo.product_price,
        }}
        setValue={setProductPrice}
        errorState={errorState.price}
      />
      <SelectField
        label="Product Type"
        type="text"
        attributes={{ name: "productType", defaultValue: isAddProductForm ? "" : productInfo.product_type }}
        options={["Laptop", "Mobile", "Desktop", "Mouse", "Keyboard", "Headphone"]}
        setValue={setProductType}
        errorState={errorState.type}
      />
      <TextAreaField
        label="Product Description"
        className="h-[200px] rounded-md p-3 resize-none overflow-hidden focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
        attributes={{
          placeholder: "Features about product",
          name: "productDescription",
          defaultValue: isAddProductForm ? "" : productInfo.product_description,
        }}
        setValue={setProductDescription}
        errorState={errorState.description}
      />
    </>
  );
}

ProductForm.propTypes = {
  productInfo: PropTypes.object,
};
