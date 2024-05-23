import React from "react";
import { productSubmitType } from "../services/constants";

export default function useForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  // userFormMessage is only used to show messages that are not related to any errors while userFormError are used to show errors only
  const [userFormMessage, setUserFormMessage] = React.useState({ email: "" });
  const [userFormError, setUserFormError] = React.useState({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
  });
  const [productFormError, setProductFormError] = React.useState({
    name: "",
    image: "",
    price: "",
    type: "",
    description: "",
  });

  function validateUserForm(inputValue) {
    const errors = {
      email: "",
      password: "",
      username: "",
      phoneNumber: "",
    };
    if (!inputValue.email) errors.email = "Please enter Email";
    errors.password = validatePassword(inputValue.password);
    if (!inputValue.isLoginForm && !inputValue.username) errors.username = "Please enter a Username";
    if (!inputValue.isLoginForm && !inputValue.phoneNumber) errors.phoneNumber = "Please enter a Phone Number";
    return Object.values(errors).every((value) => value === "") ? true : errors;
  }

  function validateProductForm(inputValue, formSubmitType) {
    const errors = {
      name: "",
      image: "",
      price: "",
      type: "",
      description: "",
    };
    if (formSubmitType !== "delete") {
      if (!inputValue.productName) errors.name = "Product name cannot be empty";
      if (!inputValue.productImage && inputValue.formSubmitType === productSubmitType.ADD_PRODUCT)
        errors.image = "Product image cannot be empty";
      if (!inputValue.productPrice) errors.price = "Product price cannot be empty";
      if (!inputValue.productDescription) errors.description = "Product description cannot be empty";
    }
    return Object.values(errors).every((value) => value === "") ? true : errors;
  }

  function handleFormClose() {
    setIsFormOpen(false);
  }

  function validatePassword(password) {
    if (!password) return "Please enter Password";
    else if (password.length < 8) return "Password should not be less than 8 characters";
    else if (!password.match(/[A-Z]/)) return "Password should contain at least one upper case character";
    else if (!password.match(/[a-z]/)) return "Password should contain at least one lower case character";
    else if (!password.match(/[0-9]/)) return "Password should contain at least one number";
    else if (!password.match(/[!@#$%^&*]/)) return "Password should contain at least one of these (!, @, #, $, %, ^, &, *)";
    else return "";
  }

  return {
    isLoading,
    isFormOpen,
    isLoginForm,
    userFormError,
    productFormError,
    showPassword,
    userFormMessage,
    setIsLoading,
    setIsFormOpen,
    setIsLoginForm,
    setUserFormError,
    setProductFormError,
    setShowPassword,
    handleFormClose,
    validateUserForm,
    validateProductForm,
    setUserFormMessage,
  };
}
