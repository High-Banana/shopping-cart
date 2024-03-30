export default function useForm(email, password, userName, openSignUp) {
  function validateForm() {
    return new Promise((resolve, reject) => {
      if (email === "" && password == "") reject("empty-email-password");
      else if (email === "") reject("empty-email");
      else if (password === "") reject("empty-password");
      else if (userName === "" && openSignUp) reject("empty-username");
      else resolve("Form is valid");
    });
  }

  return { validateForm };
}
