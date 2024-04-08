/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productType, setProductType] = useState("");
  const [productUUID, setProductUUID] = useState("");
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { validateUserForm, validateProductForm } = useForm({
    email,
    password,
    userName,
    openSignUp,
    productName,
    productImage,
    productDescription,
    productPrice,
    productType,
  });

  useEffect(() => {
    setEmail("test@gmail.com");
    setPassword("testing");
    setUserName("test");
    setInvalidMessage({ emailValue: "", passwordValue: "", userName: "" });
  }, [openSignUp]);

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
    setOpenSignUp(!openSignUp);
    return openSignUp;
  }

  function handleFormClose(event) {
    event.preventDefault();
    setIsVisible(false);
    setTimeout(() => setIsFormOpen(false), 100);
  }

  async function loginUser() {
    axios
      .post("/api/users/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          console.log(response.data[0]);
        } else console.log("Login failed");
      })
      .catch((error) => {
        setInvalidMessage({ emailValue: error.response.data, passwordValue: error.response.data });
        console.log(error.response.data);
      });
    setIsLoading(false);
  }

  async function registerUser() {
    axios
      .post("/api/users/register", { email, userName, password })
      .then((response) => {
        if (response.status === 200) {
          console.log("thanks for registering");
          setUser([{ email: email, userName: userName, password: password }]);
        } else console.log("Login failed");
      })
      .catch((error) => {
        setInvalidMessage({ emailValue: error.response.data });
        console.log(error.response.data);
      });
    setIsLoading(false);
  }

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

  async function addProduct() {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productImage", productImage[0]);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("productType", productType);
    axios
      .post("/api/products/add-product", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => {
        if (response.status === 200) {
          console.log("product added");
        } else console.log("failed");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }

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

  function handleSubmit(event, formType, action) {
    event.preventDefault();
    if (formType === "userForm") {
      validateUserForm()
        .then(() => {
          setInvalidMessage({ emailValue: "", passwordValue: "", userName: "" });
          setIsLoading(true);
          openSignUp ? registerUser() : loginUser();
        })
        .catch((error) => {
          switch (error) {
            case "empty-email":
              return setInvalidMessage({ emailValue: "Please enter Email" });
            case "empty-password":
              return setInvalidMessage({ passwordValue: "Please enter password" });
            case "empty-email-password":
              return setInvalidMessage({ emailValue: "Please enter Email", passwordValue: "Please enter Password" });
            case "empty-username":
              return setInvalidMessage({ userName: "Please enter a username" });
            default:
              alert(error);
          }
        });
    } else if (formType === "productForm") {
      console.log("product form");
      if (action === "add") {
        validateProductForm()
          .then(() => {
            handleFormClose(event);
            setIsLoading(true);
            addProduct();
            // product.productMethod(action);
            // setIsLoading(false);
            setInvalidMessage({ productName: "", productImage: "", productDescription: "" });
          })
          .catch((error) => {
            console.log("bad form");
            switch (error) {
              case "empty-productName":
                return setInvalidMessage({ productName: "Product name cannot be empty" });
              case "empty-productImage":
                return setInvalidMessage({ productImage: "Product image cannot be empty" });
              case "empty-productDescription":
                return setInvalidMessage({ productDescription: "Product description cannot be empty" });
              case "empty-productPrice":
                return setInvalidMessage({ productPrice: "Product price cannot be empty" });
              case "empty-productType":
                return setInvalidMessage({ productType: "Product type cannot be empty" });
            }
          });
      } else if (action === "edit") {
        console.log("im in edit");
        updateProduct();
        setIsSubmitted(true);
        handleFormClose(event);
        // fetchItems(productUUID);
      } else if (action === "delete") {
        console.log("dlete");
        deleteProduct();
      }
    }
  }

  const providerValues = {
    user,
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    invalidMessage,
    handleSubmit,
    toggleSignUpForm,
    isLoading,
    openSignUp,
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
