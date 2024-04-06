export default function useForm(inputValue) {
  function validateUserForm() {
    console.log(inputValue);
    return new Promise((resolve, reject) => {
      if (inputValue.email === "" && inputValue.password == "") reject("empty-email-password");
      else if (inputValue.email === "") reject("empty-email");
      else if (inputValue.password === "") reject("empty-password");
      else if (inputValue.userName === "" && inputValue.openSignUp) reject("empty-username");
      else resolve();
    });
  }

  function validateProductForm() {
    console.log("fuc");
    return new Promise((resolve, reject) => {
      if (inputValue.productName === "") reject("empty-productName");
      else if (inputValue.productImage === "") reject("empty-productImage");
      else if (inputValue.productDescription === "") reject("empty-productDescription");
      else resolve();
    });
  }

  return { validateUserForm, validateProductForm };
}
