import React from "react";

export default function useForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [userFormError, setUserFormError] = React.useState({ email: "", password: "", username: "" });
  const [productFormError, setProductFormError] = React.useState({
    name: "",
    image: "",
    price: "",
    type: "",
    description: "",
  });
  // const [errorState, setErrorState] = React.useState({
  //   // for user form
  //   email: "",
  //   password: "",
  //   username: "",
  //   // for product form
  //   name: "",
  //   image: "",
  //   price: "",
  //   type: "",
  //   description: "",
  // });

  function validateUserForm(inputValue) {
    const errors = {
      email: "",
      password: "",
      username: "",
    };
    if (!inputValue.email) errors.email = "Please enter Email";
    if (!inputValue.password) errors.password = "Please enter Password";
    if (!inputValue.isLoginForm && !inputValue.username) errors.username = "Please enter a Username";
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
      if (!inputValue.productImage && inputValue.formSubmitType === "ADD") errors.image = "Product image cannot be empty";
      if (!inputValue.productPrice) errors.price = "Product price cannot be empty";
      if (!inputValue.productDescription) errors.description = "Product description cannot be empty";
    }
    return Object.values(errors).every((value) => value === "") ? true : errors;
  }

  function handleFormClose() {
    setIsFormOpen(false);
  }

  return {
    isLoading,
    isFormOpen,
    isLoginForm,
    userFormError,
    productFormError,
    showPassword,
    setIsLoading,
    setIsFormOpen,
    setIsLoginForm,
    setUserFormError,
    setProductFormError,
    setShowPassword,
    handleFormClose,
    validateUserForm,
    validateProductForm,
  };
}
