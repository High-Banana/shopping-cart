import { useFormContext } from "../../context/FormContext";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

export default function LoginForm() {
  const { setEmail, setPassword, invalidMessage } = useFormContext();
  return (
    <>
      <EmailField setEmail={setEmail} invalidMessage={invalidMessage} />
      <PasswordField setPassword={setPassword} invalidMessage={invalidMessage} />
    </>
  );
}
