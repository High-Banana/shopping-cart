export default function useForm(email, password) {
  function validateForm() {
    return new Promise((resolve, reject) => {
      if (email === "" && password == "") reject("empty-email-password");
      else if (email === "") reject("empty-email");
      else if (password === "") reject("empty-password");
      else resolve("Form is valid");
    });
  }

  return { validateForm };
}
