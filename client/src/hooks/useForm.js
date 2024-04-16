import React from "react";

export default function useForm() {
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [errorState, setErrorState] = React.useState({
    // for user form
    email: "",
    password: "",
    username: "",
    // for product form
    name: "",
    image: "",
    price: "",
    type: "",
    description: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    console.log(errorState);
  }, [errorState]);

  function validateUserForm(inputValue) {
    const errors = {
      email: "",
      password: "",
      username: "",
    };
    console.log(inputValue);
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
      if (!inputValue.productImage && formSubmitType === "add") errors.image = "Product image cannot be empty";
      if (!inputValue.productPrice) errors.price = "Product price cannot be empty";
      if (!inputValue.productDescription) errors.description = "Product description cannot be empty";
    }
    console.log(errors.name);
    return Object.values(errors).every((value) => value === "") ? true : errors;
  }

  return {
    isLoginForm,
    setIsLoginForm,
    validateUserForm,
    errorState,
    setErrorState,
    showPassword,
    setShowPassword,
    validateProductForm,
  };
}
