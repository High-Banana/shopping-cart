import InputField from "../../components/Forms/InputField";
import PasswordToggle from "../../components/ui/PasswordToggle";
import { useFormContext } from "../../context/FormContext";
import useForm from "../../hooks/useForm";

export default function SignUpForm() {
  // const { setEmail, setPassword, setUserName, invalidMessage } = useFormContext();
  const { setEmail, setPassword, setUsername, errorState } = useFormContext();
  const { showPassword, setShowPassword } = useForm();
  return (
    <>
      {/* <EmailField setEmail={setEmail} invalidMessage={invalidMessage} />
      <UserNameField setUserName={setUserName} invalidMessage={invalidMessage} />
      <PasswordField setPassword={setPassword} invalidMessage={invalidMessage} /> */}
      <InputField
        label="Email"
        type="email"
        attributes={{ placeholder: "Enter your Email", autoComplete: "username" }}
        errorState={errorState.email}
        setValue={setEmail}
      />
      <InputField
        label="Username"
        type="text"
        attributes={{ placeholder: "Enter your Username", autoComplete: "username" }}
        errorState={errorState.username}
        setValue={setUsername}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        attributes={{ placeholder: "*******", autoComplete: "current-password" }}
        errorState={errorState.password}
        setValue={setPassword}
      />
      <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} className={"top-[228px]"} />
    </>
  );
}
