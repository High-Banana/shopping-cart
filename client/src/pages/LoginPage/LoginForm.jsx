/* eslint-disable react-hooks/exhaustive-deps */
import useForm from "../../hooks/useForm";
import InputField from "../../components/Forms/InputField";
import PasswordToggle from "../../components/ui/PasswordToggle";
import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { userFormFillup, userFormType } from "../../services/constants";

export default function LoginForm() {
  const { dispatch, userFormError } = useUserContext();
  const { showPassword, setShowPassword } = useForm();

  useEffect(() => {
    dispatch({ type: userFormType.LOGIN_FORM });
  }, []);

  return (
    <>
      <InputField
        label="Email"
        type="email"
        attributes={{ autoComplete: "username", placeholder: "Enter your Email" }}
        errorState={userFormError.email}
        setValue={(value) => dispatch({ type: userFormFillup.SET_USER_EMAIL, payload: value })}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        attributes={{ autoComplete: "current-password", placeholder: "Enter your password" }}
        errorState={userFormError.password}
        setValue={(value) => dispatch({ type: userFormFillup.SET_USER_PASSWORD, payload: value })}
      />
      <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
    </>
  );
}
