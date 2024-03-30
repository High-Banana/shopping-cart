/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { validateForm } = useForm(email, password, userName);
  const [invalidMessage, setInvalidMessage] = useState({ email: "", password: "" });
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        setInvalidMessage({ email: error.response.data, password: error.response.data });
        console.log(error.response.data);
      });
    setIsLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateForm()
      .then(() => {
        setInvalidMessage({ email: "", password: "" });
        setIsLoading(true);
        loginUser();
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
          case "empty-username":
            return setInvalidMessage({ username: "Please enter a username" });
          default:
            alert(error);
        }
      });
    console.log(invalidMessage);
  }

  const providerValues = {
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    invalidMessage,
    handleSubmit,
    isLoading,
  };

  return <FormContext.Provider value={providerValues}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  return useContext(FormContext);
}
