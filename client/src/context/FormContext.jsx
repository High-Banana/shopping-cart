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
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { validateUserForm, validateProductForm } = useForm({
    email,
    password,
    userName,
    openSignUp,
    productName,
    productImage,
    productDescription,
  });
  const [invalidMessage, setInvalidMessage] = useState();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUserName("");
    setInvalidMessage({ emailValue: "", passwordValue: "", userName: "" });
  }, [openSignUp]);

  useEffect(() => {
    setProductName("");
    setProductImage("");
    setProductDescription("");
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

  function handleSubmit(event, formType) {
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
              console.log("huh");
              return setInvalidMessage({ userName: "Please enter a username" });
            default:
              alert(error);
          }
        });
    } else if (formType === "productForm") {
      console.log("product form");
      validateProductForm()
        .then(() => {
          handleFormClose(event);
          setInvalidMessage({ productName: "", productImage: "", productDescription: "" });
          console.log("good form");
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
          }
        });
    }

    console.log(openSignUp);
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
    productDescription,
    setProductDescription,
    isFormOpen,
    setIsFormOpen,
    handleFormClose,
    setIsVisible,
    isVisible,
  };

  return <FormContext.Provider value={providerValues}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  return useContext(FormContext);
}
