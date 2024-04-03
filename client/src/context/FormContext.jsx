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
  const [openSignUp, setOpenSignUp] = useState(false);
  const { validateForm } = useForm(email, password, userName, openSignUp);
  const [invalidMessage, setInvalidMessage] = useState({ emailValue: "", passwordValue: "", userName: "" });
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUserName("");
    setInvalidMessage({ emailValue: "", passwordValue: "", userName: "" });
  }, [openSignUp]);

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

  async function registerUser() {
    axios
      .post("/api/users/register", { email, userName, password })
      .then((response) => {
        if (response.status === 200) {
          console.log("thanks for registering");
          setUser([email, password, userName]);
        } else console.log("Login failed");
      })
      .catch((error) => {
        setInvalidMessage({ emailValue: error.response.data });
        console.log(error.response.data);
      });
    setIsLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateForm()
      .then(() => {
        setInvalidMessage({ emailValue: "", passwordValue: "", userName: "" });
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
            console.log("huh");
            return setInvalidMessage({ userName: "Please enter a username" });
          default:
            alert(error);
        }
      });
    console.log(openSignUp);
  }

  const providerValues = {
    user,
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
