import InputField from "../../components/Forms/InputField";
import PasswordToggle from "../../components/ui/PasswordToggle";
import { useFormContext } from "../../context/FormContext";
import useForm from "../../hooks/useForm";

export default function LoginForm() {
  const { setEmail, setPassword, errorState } = useFormContext();
  const { showPassword, setShowPassword } = useForm();
  return (
    <>
      <InputField
        label="Email"
        type="email"
        attributes={{ autoComplete: "username", placeholder: "Enter your Email" }}
        errorState={errorState.email}
        setValue={setEmail}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        attributes={{ autoComplete: "current-password", placeholder: "Enter your password" }}
        errorState={errorState.password}
        setValue={setPassword}
      />
      <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
    </>
  );
}
