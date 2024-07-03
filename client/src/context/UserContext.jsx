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

function setUserInSessionStorage(user) {
  if (user.length > 0) {
    window.sessionStorage.setItem("userID", user[0].userId);
    window.sessionStorage.setItem("username", user[0].username);
    window.sessionStorage.setItem("email", user[0].email);
    window.sessionStorage.setItem("password", user[0].password);
    window.sessionStorage.setItem("phone-number", user[0].phone_number);
    window.sessionStorage.setItem("isAdmin", user[0].isAdmin);
  }
}

function getDetailsFromSessionStorage(setUserDetails) {
  setUserDetails({
    userID: window.sessionStorage.getItem("userID"),
    username: window.sessionStorage.getItem("username"),
    email: window.sessionStorage.getItem("email"),
    password: window.sessionStorage.getItem("password"),
    phoneNumber: window.sessionStorage.getItem("phone-number"),
    isAdmin: parseInt(window.sessionStorage.getItem("isAdmin")),
  });
}

export function UserProvider({ children }) {
  const [userFormDetail, dispatch] = React.useReducer(userReducer, initialUserFormDetail);
  // const [user, setUser] = React.useState("");
  const [userDetails, setUserDetails] = React.useState({
    userID: null,
    username: null,
    email: null,
    password: null,
    phoneNumber: null,
    isAdmin: null,
  });
  const { validateUserForm, isLoading, setIsLoading, userFormError, setUserFormError } = useForm();
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);
  const { submitUserForm } = useUserAPI();

  React.useEffect(() => {
    getDetailsFromSessionStorage(setUserDetails);
  }, [isLoggedOut]);

  async function handleUserSubmit(event) {
    event.preventDefault();
    const isFormValid = validateUserForm(userFormDetail);
    console.log(userFormError);
    console.log(isFormValid);
    if (isFormValid !== true) return setUserFormError(isFormValid);
    setIsLoading(true);
    await submitUserForm(userFormDetail)
      .then((response) => {
        console.log(response);
        if (response[0].isVerified === 1) {
          setUserInSessionStorage(response);
          getDetailsFromSessionStorage(setUserDetails);
        }
        setUserFormError(userFormError);
        if (!userFormDetail.isLoginForm)
          setUserFormError({ email: "Check your Email for confirmation", password: "", username: "", phoneNumber: "" });
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
    // user,
    // setUser,
    userDetails,
    setUserDetails,
    setUserFormError,
    userFormError,
    isLoggedOut,
    setIsLoggedOut,
  };

  return <UserContext.Provider value={ProviderValues}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return React.useContext(UserContext);
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
