/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import useProductAPI from "../hooks/useProductAPI";
import { useUIContext } from "./UIContext";
import { productFormFillup, productSubmitType } from "../services/constants";

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
    case productFormFillup.SET_PRODUCT_NAME:
      return { ...state, productName: action.payload };
    case productFormFillup.SET_PRODUCT_IMAGE:
      return { ...state, productImage: action.payload };
    case productFormFillup.SET_PRODUCT_PRICE:
      return { ...state, productPrice: action.payload };
    case productFormFillup.SET_PRODUCT_TYPE:
      return { ...state, productType: action.payload };
    case productFormFillup.SET_PRODUCT_DESCRIPTION:
      return { ...state, productDescription: action.payload };
    case productFormFillup.SET_PRODUCT_UUID:
      return { ...state, productUUID: action.payload };
    case productSubmitType.ADD_PRODUCT:
      return { ...state, formSubmitType: productSubmitType.ADD_PRODUCT };
    case productSubmitType.UPDATE_PRODUCT:
      return { ...state, formSubmitType: productSubmitType.UPDATE_PRODUCT };
    case productSubmitType.DELETE_PRODUCT:
      return { ...state, formSubmitType: productSubmitType.DELETE_PRODUCT };
  }
}

export function ProductFormProvider({ children }) {
  const [productFormDetail, dispatch] = React.useReducer(productReducer, initialProductFormDetail);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [reFetchData, setReFetchData] = React.useState(false);
  const [isProductDeleted, setIsProductDeleted] = React.useState(false);
  const { validateProductForm, setProductFormError, setIsLoading, productFormError } = useForm();
  const { submitProductForm } = useProductAPI();
  const { handleFormClose } = useUIContext();

  React.useEffect(() => {
    setReFetchData(false);
    setIsProductDeleted(false);
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

  function handleResponse(response) {
    if (response.data.message === "product-deleted") {
      setReFetchData(false);
      setIsProductDeleted(true);
    } else {
      if (response.data.message === "product-added") {
        dispatch({ type: "SET_PRODUCT_UUID", payload: response.data.productUUID });
        dispatch({ type: "SET_PRODUCT_TYPE", payload: response.data.productType });
      }
      setTimeout(() => {
        setReFetchData(true);
      }, 200);
    }
  }

  async function handleProductSubmit(event) {
    event.preventDefault();
    const isFormValid = validateProductForm(productFormDetail);
    console.log(isFormValid);
    const { formSubmitType, productUUID } = productFormDetail;
    if (isFormValid !== true && formSubmitType !== "DELETE") return setProductFormError(isFormValid);
    const formData = getFormDatas();
    setIsLoading(true);
    await submitProductForm(formData, formSubmitType, productUUID)
      .then((response) => {
        handleResponse(response);
        handleFormClose(event);
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
    isProductDeleted,
    dispatch,
    setProductFormError,
    setIsFormOpen,
    setReFetchData,
    setIsProductDeleted,
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
