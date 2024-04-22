/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import useUserAPI from "../hooks/useUserAPI";
import useProductAPI from "../hooks/useProductAPI";

const FormContext = React.createContext();

export function FormProvider({ children }) {
  // for user login and registration
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [user, setUser] = React.useState([]);
  // for product adding and updating
  const [productName, setProductName] = React.useState("");
  const [productImage, setProductImage] = React.useState();
  const [productDescription, setProductDescription] = React.useState("");
  const [productPrice, setProductPrice] = React.useState();
  const [productType, setProductType] = React.useState("");
  const [productUUID, setProductUUID] = React.useState("");
  // to check for form validations and form types
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [formSubmitType, setFormSubmitType] = React.useState("");
  const [isAddProductForm, setIsAddProductForm] = React.useState(false);
  const { validateUserForm, validateProductForm, errorState, setErrorState } = useForm();
  const { submitUserForm } = useUserAPI();
  const { submitProductForm } = useProductAPI();
  // to open and close forms and form animations
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [openDeleteForm, setOpenDeleteForm] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  // for loading animation while data is being fetched
  const [isLoading, setIsLoading] = React.useState(false);
  // to navigate to recently added product
  const [addedProduct, setAddedProduct] = React.useState(false);

  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
  }, [isLoginForm]);

  React.useEffect(() => {
    setProductName("");
    setProductImage("");
    setProductDescription("");
    setProductPrice();
    setProductType("");
    setIsSubmitted(false);
    setAddedProduct(false);
  }, [isFormOpen]);

  function handleFormClose(event) {
    event.preventDefault();
    setIsVisible(false);
    setTimeout(() => {
      setIsFormOpen(false);
      setOpenDeleteForm(false);
    }, 100);
  }

  async function handleUserSubmit(event) {
    const inputValues = { email, password, username, isLoginForm };
    event.preventDefault();
    const isFormValid = validateUserForm(inputValues);
    if (isFormValid === true) {
      setIsLoading(true);
      await submitUserForm(inputValues)
        .then((response) => {
          setUser(response);
          setErrorState(errorState);
          setIsLoginForm(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            setErrorState({ email: error.response.data, password: error.response.data, username: "" });
          } else if (error.response.status === 409) {
            setErrorState({ email: error.response.data, password: "", username: "" });
          }
        })
        .finally(setIsLoading(false));
    } else {
      setErrorState(validateUserForm(inputValues));
    }
  }

  async function handleProductSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productImage", productImage[0]);
    formData.append("productPrice", productPrice);
    formData.append("productType", productType);
    formData.append("productDescription", productDescription);
    const inputValues = { productName, productPrice, productDescription, productType, productImage };
    const isFormValid = validateProductForm(inputValues, formSubmitType);
    if (isFormValid === true) {
      setIsLoading(true);
      handleFormClose(event);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await submitProductForm(formData, formSubmitType, productUUID)
        .then((response) => {
          console.log(response);
          if (response) {
            setProductUUID(response.data.productUUID);
            setProductType(response.data.productType);
            setAddedProduct(true);
          }
          // Used setTimout so that form can close smoothly. Didn't put it in handleFormClose because everytime it changes, it triggers fetching function in SingleProduct.jsx. We do not want to fetch the data even when the form is simply closed.
          setTimeout(() => {
            setIsSubmitted(true);
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } else setErrorState(validateProductForm(inputValues, formSubmitType));
  }

  const providerValues = {
    // for user login and registration
    user,
    email,
    password,
    username,
    setEmail,
    setPassword,
    setUsername,
    // for product form
    productName,
    productImage,
    productPrice,
    productType,
    productDescription,
    productUUID,
    setProductName,
    setProductImage,
    setProductPrice,
    setProductType,
    setProductDescription,
    setProductUUID,
    // to check form validations
    errorState,
    isLoginForm,
    isAddProductForm,
    setErrorState,
    setIsLoginForm,
    setFormSubmitType,
    setIsAddProductForm,
    handleUserSubmit,
    handleProductSubmit,
    // for loading and form animations
    isLoading,
    isFormOpen,
    openDeleteForm,
    isVisible,
    isSubmitted,
    addedProduct,
    setIsFormOpen,
    setOpenDeleteForm,
    handleFormClose,
    setIsVisible,
    setAddedProduct,
  };

  return <FormContext.Provider value={providerValues}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  return React.useContext(FormContext);
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
