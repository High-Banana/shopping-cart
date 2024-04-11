import React from "react";

export default function useForm() {
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [errorState, setErrorState] = React.useState({ email: "", password: "" });

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
    if (!inputValue.isLoginForm && !inputValue.username) errors.username = "Please enter a username";
    return Object.values(errors).every((value) => value === "") ? true : errors;
  }

  // function validateProductForm() {
  //   return new Promise((resolve, reject) => {
  //     if (inputValue.productName === "") reject("empty-productName");
  //     else if (inputValue.productImage === "") reject("empty-productImage");
  //     else if (isNaN(inputValue.productPrice)) reject("empty-productPrice");
  //     else if (inputValue.productType === "") reject("empty-productType");
  //     else if (inputValue.productDescription === "") reject("empty-productDescription");
  //     else resolve();
  //   });
  // }

  return { isLoginForm, setIsLoginForm, validateUserForm, errorState, setErrorState };
}
