/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { validateForm } = useForm(email, password, userName);
  const [invalidMessage, setInvalidMessage] = useState({ emailValue: "", passwordValue: "" });
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUserName("");
    console.log(user);
  }, [openSignUp, user]);

  function toggleSignUpForm() {
    setOpenSignUp(!openSignUp);
    return openSignUp;
  }

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
        setInvalidMessage({ emailValue: error.response.data, passwordValue: error.response.data });
        console.log(error.response.data);
      });
    setIsLoading(false);
  }

  function registerUser() {
    console.log("thanks for registering");
    setUser([email, password, userName]);
    setIsLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateForm()
      .then(() => {
        setInvalidMessage({ emailValue: "", passwordValue: "", username: "" });
        setIsLoading(true);
        openSignUp ? registerUser() : loginUser();
      })
      .catch((error) => {
        switch (error) {
          case "empty-email":
            return setInvalidMessage({ emailValue: "Please enter Email" });
          case "empty-password":
            return setInvalidMessage({ passwordValue: "Please enter password" });
          case "empty-email-password":
            return setInvalidMessage({ emailValue: "Please enter Email", passwordValue: "Please enter Password" });
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
    toggleSignUpForm,
    isLoading,
    openSignUp,
  };

  return <FormContext.Provider value={providerValues}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  return useContext(FormContext);
}
