/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import useUserAPI from "../hooks/useUserAPI";

const UserContext = React.createContext();

const initialUserFormDetail = {
  email: "",
  password: "",
  username: "",
  isLoginForm: false,
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL": {
      return { ...state, email: action.payload };
    }
    case "SET_PASSWORD": {
      return { ...state, password: action.payload };
    }
    case "SET_USERNAME": {
      return { ...state, username: action.payload };
    }
    case "LOGIN_FORM": {
      return { ...state, isLoginForm: true };
    }
    case "SIGNUP_FORM": {
      return { ...state, isLoginForm: false };
    }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

export function UserProvider({ children }) {
  const [userFormDetail, dispatch] = React.useReducer(userReducer, initialUserFormDetail);
  const [user, setUser] = React.useState("");
  const { validateUserForm, isLoading, setIsLoading, userFormError, setUserFormError } = useForm();
  const { submitUserForm } = useUserAPI();

  async function handleUserSubmit(event) {
    event.preventDefault();
    const isFormValid = validateUserForm(userFormDetail);
    console.log(userFormError);
    console.log(isFormValid);
    if (isFormValid !== true) return setUserFormError(isFormValid);
    setIsLoading(true);
    await submitUserForm(userFormDetail)
      .then((response) => {
        setUser(response);
        setUserFormError(userFormError);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setUserFormError({ email: error.response.data, password: error.response.data, username: "" });
        } else if (error.response.status === 409) {
          setUserFormError({ email: error.response.data, password: "", username: "" });
        }
      })
      .finally(setIsLoading(false));
  }

  const ProviderValues = {
    // userFormDetail,
    dispatch,
    handleUserSubmit,
    isLoading,
    user,
    setUserFormError,
    userFormError,
  };

  return <UserContext.Provider value={ProviderValues}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return React.useContext(UserContext);
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
