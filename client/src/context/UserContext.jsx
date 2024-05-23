/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import useUserAPI from "../hooks/useUserAPI";
import { userFormFillup, userFormType } from "../services/constants";

const UserContext = React.createContext();

const initialUserFormDetail = {
  email: "",
  password: "",
  username: "",
  isLoginForm: false,
};

function userReducer(state, action) {
  switch (action.type) {
    case userFormFillup.SET_USER_EMAIL: {
      return { ...state, email: action.payload };
    }
    case userFormFillup.SET_USER_PASSWORD: {
      return { ...state, password: action.payload };
    }
    case userFormFillup.SET_USER_NAME: {
      return { ...state, username: action.payload };
    }
    case userFormFillup.SET_USER_PHONE_NUMBER: {
      return { ...state, phoneNumber: action.payload };
    }
    case userFormType.LOGIN_FORM: {
      return { ...state, isLoginForm: true };
    }
    case userFormType.REGISTER_FORM: {
      return { ...state, isLoginForm: false };
    }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

export function UserProvider({ children }) {
  const [userFormDetail, dispatch] = React.useReducer(userReducer, initialUserFormDetail);
  const [user, setUser] = React.useState("");
  const { validateUserForm, isLoading, setIsLoading, userFormError, setUserFormError, userFormMessage, setUserFormMessage } =
    useForm();
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
        if (!userFormDetail.isLoginForm) setUserFormMessage({ email: "Check your Email for confirmation" });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setUserFormError({ email: error.response.data, password: error.response.data, username: "", phoneNumber: "" });
        } else if (error.response.status === 409) {
          setUserFormError({ email: error.response.data, password: "", username: "", phoneNumber: "" });
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
    userFormMessage,
  };

  return <UserContext.Provider value={ProviderValues}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return React.useContext(UserContext);
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
