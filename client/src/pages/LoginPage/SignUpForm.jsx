/* eslint-disable react-hooks/exhaustive-deps */
import useForm from "../../hooks/useForm";
import InputField from "../../components/Forms/InputField";
import PasswordToggle from "../../components/ui/PasswordToggle";
import { useUserContext } from "../../context/UserContext";
import React from "react";

export default function SignUpForm() {
  const { dispatch, userFormError } = useUserContext();
  const { showPassword, setShowPassword } = useForm();

  React.useEffect(() => {
    dispatch({ type: "SIGNUP_FORM" });
  }, []);

  return (
    <>
      <InputField
        label="Email"
        type="email"
        attributes={{ placeholder: "Enter your Email", autoComplete: "username" }}
        errorState={userFormError.email}
        setValue={(value) => dispatch({ type: "SET_EMAIL", payload: value })}
      />
      <InputField
        label="Username"
        type="text"
        attributes={{ placeholder: "Enter your Username", autoComplete: "username" }}
        errorState={userFormError.username}
        setValue={(value) => dispatch({ type: "SET_USERNAME", payload: value })}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        attributes={{ placeholder: "*******", autoComplete: "current-password" }}
        errorState={userFormError.password}
        setValue={(value) => dispatch({ type: "SET_PASSWORD", payload: value })}
      />
      <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} className={"top-[228px]"} />
    </>
  );
}
