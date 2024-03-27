import { useState } from "react";
import { fetchRegisteredUsers } from "../services/api/Fetch";
import axios from "axios";

export default function useForm(email, password) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState({
    email: "",
    password: "",
  });

  async function fetchUser() {
    axios
      .post("/api/users/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setUser(response.data);
          console.log(response.data[0]);
        } else console.log("Login failed");
      })
      .catch((error) => {
        setInvalidMessage({ email: error.response.data, password: error.response.data });
        console.log(error.response.data);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateForm()
      .then(() => {
        setInvalidMessage({ email: "", password: "" });
        setIsLoading(true);
        fetchUser();
        console.log(user);
      })
      .catch((error) => {
        switch (error) {
          case "empty-email":
            return setInvalidMessage({ email: "Please enter Email" });
          case "empty-password":
            return setInvalidMessage({ password: "Please enter password" });
          case "empty-email-password":
            return setInvalidMessage({ email: "Please enter Email", password: "Please enter Password" });
          default:
            alert(error);
        }
      });
  }

  function validateForm() {
    return new Promise((resolve, reject) => {
      if (email === "" && password == "") reject("empty-email-password");
      else if (email === "") reject("empty-email");
      else if (password === "") reject("empty-password");
      else resolve("Form is valid");
    });
  }

  return { handleSubmit, isLoading, invalidMessage };
}
