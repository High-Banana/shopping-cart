/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";
import useUserAPI from "../hooks/useUserAPI";
import useProductAPI from "../hooks/useProductAPI";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productType, setProductType] = useState("");
  const [productUUID, setProductUUID] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { validateUserForm, validateProductForm, errorState, setErrorState } = useForm();
  const { submitUserForm } = useUserAPI();
  const { submitProductForm } = useProductAPI();
  const [formSubmitType, setFormSubmitType] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
    setInvalidMessage({ emailValue: "", passwordValue: "", userName: "" });
  }, [isLoginForm]);

  useEffect(() => {
    setProductName("");
    setProductImage("");
    setProductDescription("");
    setProductPrice();
    setProductType("");
    setIsSubmitted(false);
    setInvalidMessage({ productName: "", productImage: "", productDescription: "" });
  }, [isFormOpen]);

  function toggleSignUpForm() {
    setIsLoginForm(!isLoginForm);
    return isLoginForm;
  }

  function handleFormClose(event) {
    event.preventDefault();
    setIsVisible(false);
    setTimeout(() => setIsFormOpen(false), 100);
  }

  // async function registerUser() {
  //   axios
  //     .post("/api/users/register", { email, username, password })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("thanks for registering");
  //         setUser([{ email: email, userName: username, password: password }]);
  //       } else console.log("Login failed");
  //     })
  //     .catch((error) => {
  //       setInvalidMessage({ emailValue: error.response.data });
  //       console.log(error.response.data);
  //     });
  //   setIsLoading(false);
  // }

  // class Product {
  //   constructor(productName, productImage, productDescription, productPrice, productType) {
  //     this.formData = new FormData();
  //     this.formData.append("productName", productName);
  //     this.formData.append("productImage", productImage[0]);
  //     this.formData.append("productDescription", productDescription);
  //     this.formData.append("productPrice", productPrice);
  //     this.formData.append("productType", productType);
  //   }

  //   productMethod(action) {
  //     axios
  //       .post(`/api/products/${action}-product`, this.formData, { headers: { "Content-Type": "multipart/form-data" } })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           console.log("product added");
  //         } else console.log("failed");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  // const product = new Product("add", productName, productImage, productDescription, productPrice, productType);

  // async function addProduct() {
  //   const formData = new FormData();
  //   formData.append("productName", productName);
  //   formData.append("productImage", productImage[0]);
  //   formData.append("productDescription", productDescription);
  //   formData.append("productPrice", productPrice);
  //   formData.append("productType", productType);
  //   axios
  //     .post("/api/products/add-product", formData, { headers: { "Content-Type": "multipart/form-data" } })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("product added");
  //       } else console.log("failed");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setIsLoading(false);
  // }

  async function updateProduct() {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productImage", productImage[0]);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("productType", productType);

    axios
      .put(`/api/products/edit-product/${productUUID}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => {
        if (response.status === 200) {
          console.log("product updated");
        } else console.log("failed");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }

  async function deleteProduct() {
    axios
      .delete(`/api/products/delete-product/${productUUID}`)
      .then(() => {
        console.log("deleted successfully");
      })
      .catch((error) => console.log(error));
  }

  // function handleSubmit(event, formType, action) {
  //   event.preventDefault();
  //   if (formType === "userForm") {
  //     validateUserForm()
  //       .then(() => {
  //         setInvalidMessage({ emailValue: "", passwordValue: "", userName: "" });
  //         setIsLoading(true);
  //         isLoginForm ? registerUser() : loginUser();
  //       })
  //       .catch((error) => {
  //         switch (error) {
  //           case "empty-email":
  //             return setInvalidMessage({ emailValue: "Please enter Email" });
  //           case "empty-password":
  //             return setInvalidMessage({ passwordValue: "Please enter password" });
  //           case "empty-email-password":
  //             return setInvalidMessage({ emailValue: "Please enter Email", passwordValue: "Please enter Password" });
  //           case "empty-username":
  //             return setInvalidMessage({ userName: "Please enter a username" });
  //           default:
  //             alert(error);
  //         }
  //       });
  //   } else if (formType === "productForm") {
  //     console.log("product form");
  //     if (action === "add") {
  //       validateProductForm()
  //         .then(() => {
  //           handleFormClose(event);
  //           setIsLoading(true);
  //           addProduct();
  //           // product.productMethod(action);
  //           // setIsLoading(false);
  //           setInvalidMessage({ productName: "", productImage: "", productDescription: "" });
  //         })
  //         .catch((error) => {
  //           console.log("bad form");
  //           switch (error) {
  //             case "empty-productName":
  //               return setInvalidMessage({ productName: "Product name cannot be empty" });
  //             case "empty-productImage":
  //               return setInvalidMessage({ productImage: "Product image cannot be empty" });
  //             case "empty-productDescription":
  //               return setInvalidMessage({ productDescription: "Product description cannot be empty" });
  //             case "empty-productPrice":
  //               return setInvalidMessage({ productPrice: "Product price cannot be empty" });
  //             case "empty-productType":
  //               return setInvalidMessage({ productType: "Product type cannot be empty" });
  //           }
  //         });
  //     } else if (action === "edit") {
  //       console.log("im in edit");
  //       updateProduct();
  //       setIsSubmitted(true);
  //       handleFormClose(event);
  //       // fetchItems(productUUID);
  //     } else if (action === "delete") {
  //       console.log("dlete");
  //       deleteProduct();
  //       setIsSubmitted(true);
  //       handleFormClose(event);
  //     }
  //   }
  // }

  async function handleUserSubmit(event) {
    const inputValues = { email, password, username, isLoginForm };
    event.preventDefault();
    const isFormValid = validateUserForm(inputValues);
    if (isFormValid === true) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
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
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const inputValues = { productName, productPrice, productDescription, productType, productImage };
    const isFormValid = validateProductForm(inputValues);
    if (isFormValid === true) {
      submitProductForm(formData, formSubmitType);
      handleFormClose(event);
      setIsSubmitted(true);
    } else setErrorState(validateProductForm(inputValues));
  }

  const providerValues = {
    errorState,
    setErrorState,
    setIsLoginForm,
    setFormSubmitType,
    user,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    invalidMessage,
    handleUserSubmit,
    handleProductSubmit,
    toggleSignUpForm,
    isLoading,
    isLoginForm,
    productName,
    setProductName,
    productImage,
    setProductImage,
    productPrice,
    setProductPrice,
    productType,
    setProductType,
    productDescription,
    setProductDescription,
    isFormOpen,
    setIsFormOpen,
    handleFormClose,
    setIsVisible,
    isVisible,
    setProductUUID,
    isSubmitted,
  };

  return <FormContext.Provider value={providerValues}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  return useContext(FormContext);
}
