/* eslint-disable react-hooks/exhaustive-deps */
import useForm from "../../hooks/useForm";
import InputField from "../../components/Forms/InputField";
import PasswordToggle from "../../components/ui/PasswordToggle";
import { useUserContext } from "../../context/UserContext";
import React from "react";
import { userFormFillup, userFormType } from "../../services/constants";

export default function SignUpForm() {
  const { dispatch, userFormError } = useUserContext();
  const { showPassword, setShowPassword } = useForm();

  React.useEffect(() => {
    dispatch({ type: userFormType.REGISTER_FORM });
  }, []);

  return (
    <>
      <InputField
        label="Email"
        type="email"
        attributes={{ placeholder: "Enter your Email", autoComplete: "username" }}
        errorState={userFormError.email}
        setValue={(value) => dispatch({ type: userFormFillup.SET_USER_EMAIL, payload: value })}
      />
      <InputField
        label="Username"
        type="text"
        attributes={{ placeholder: "Enter your Username", autoComplete: "username" }}
        errorState={userFormError.username}
        setValue={(value) => dispatch({ type: userFormFillup.SET_USER_NAME, payload: value })}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        attributes={{ placeholder: "*******", autoComplete: "current-password" }}
        errorState={userFormError.password}
        setValue={(value) => dispatch({ type: userFormFillup.SET_USER_PASSWORD, payload: value })}
      />
      <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} className={"top-[228px]"} />
      <InputField
        label="Phone number"
        type="text"
        attributes={{ placeholder: "+977 9876543210" }}
        errorState={userFormError.phoneNumber}
        setValue={(value) => dispatch({ type: userFormFillup.SET_USER_PHONE_NUMBER, payload: value })}
      />
    </>
  );
}
