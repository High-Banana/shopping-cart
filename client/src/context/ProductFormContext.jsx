/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import useProductAPI from "../hooks/useProductAPI";

const ProductContext = React.createContext();

const initialProductFormDetail = {
  productName: "",
  productImage: "",
  productPrice: "",
  productType: "",
  productDescription: "",
  productUUID: "",
  formSubmitType: "",
};

function productReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCT_NAME":
      return { ...state, productName: action.payload };
    case "SET_PRODUCT_IMAGE":
      return { ...state, productImage: action.payload };
    case "SET_PRODUCT_PRICE":
      return { ...state, productPrice: action.payload };
    case "SET_PRODUCT_TYPE":
      return { ...state, productType: action.payload };
    case "SET_PRODUCT_DESCRIPTION":
      return { ...state, productDescription: action.payload };
    case "SET_PRODUCT_UUID":
      return { ...state, productUUID: action.payload };
    case "ADD_PRODUCT":
      return { ...state, formSubmitType: "ADD" };
  }
}

export function ProductFormProvider({ children }) {
  const [productFormDetail, dispatch] = React.useReducer(productReducer, initialProductFormDetail);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [reFetchData, setReFetchData] = React.useState(false);
  const { validateProductForm, setProductFormError, setIsLoading, productFormError } = useForm();
  const { submitProductForm } = useProductAPI();

  React.useEffect(() => {
    setReFetchData(false);
  }, []);

  function getFormDatas() {
    const formData = new FormData();
    formData.append("productName", productFormDetail.productName);
    formData.append("productImage", productFormDetail.productImage[0]);
    formData.append("productPrice", productFormDetail.productPrice);
    formData.append("productType", productFormDetail.productType);
    formData.append("productDescription", productFormDetail.productDescription);
    return formData;
  }

  function handleFormClose(event) {
    event.preventDefault();
    // setIsVisible(false);
    console.log("close");
    setTimeout(() => {
      setIsFormOpen(false);
      //   setOpenDeleteForm(false);
    }, 100);
  }

  function handleResponse(response) {
    console.log(response);
    if (response.data.message === "product-added") {
      dispatch({ type: "SET_PRODUCT_UUID", payload: response.data.productUUID });
      dispatch({ type: "SET_PRODUCT_TYPE", payload: response.data.productType });
      setReFetchData(true);
    } else if (response.data.message === "product-deleted") {
      //   setIsProductDeleted(true);
    }
  }

  async function handleProductSubmit(event) {
    event.preventDefault();
    const isFormValid = validateProductForm(productFormDetail);
    console.log(isFormValid);
    if (isFormValid !== true) return setProductFormError(isFormValid);
    const formData = getFormDatas();
    setIsLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(formData);
    await submitProductForm(formData, productFormDetail.formSubmitType, productFormDetail.productUUID)
      .then((response) => {
        // handleFormClose(event);
        handleResponse(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setProductFormError({ name: "", image: "", price: "", type: "", description: "" });
      });
  }

  const ProviderValues = {
    productFormDetail,
    productFormError,
    isFormOpen,
    reFetchData,
    dispatch,
    setProductFormError,
    setIsFormOpen,
    handleFormClose,
    handleProductSubmit,
  };

  return <ProductContext.Provider value={ProviderValues}>{children}</ProductContext.Provider>;
}

export function useProductFormProvider() {
  return React.useContext(ProductContext);
}

ProductFormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
