import { useState } from "react";
import { fetchRegisteredUsers } from "../services/api/Fetch";
import axios from "axios";

export default function useForm(email, password) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [invalidMessage, setinvalidMessage] = useState({
    email: "",
    password: "",
  });

  async function fetchUser() {
    try {
      axios.post("/api/users/login", { email, password }).then((response) => {
        if (response.status === 200) {
          const data = response.data;
          console.log("Login successful:", data);
        } else {
          console.log("Login failed");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateForm()
      .then(() => {
        setinvalidMessage({ email: "", password: "" });
        fetchUser();
      })
      .catch((error) => {
        switch (error) {
          case "empty-email":
            return setinvalidMessage({ email: "Please enter Email" });
          case "empty-password":
            return setinvalidMessage({ password: "Please enter password" });
          default:
            alert(error);
        }
      });
    console.log(user);
  }

  function validateForm() {
    return new Promise((resolve, reject) => {
      if (email === "") reject("empty-email");
      else if (password === "") reject("empty-password");
      else resolve("Form is valid");
    });
  }

  return { handleSubmit, isLoading, invalidMessage };
}
