import { useFormContext } from "../../context/FormContext";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import UserNameField from "./UserNameField";

export default function SignUpForm() {
  const { setEmail, setPassword, setUsername, invalidMessage } = useFormContext();
  return (
    <>
      <EmailField setEmail={setEmail} invalidMessage={invalidMessage} />
      <UserNameField setUsername={setUsername} invalidMessage={invalidMessage} />
      <PasswordField setPassword={setPassword} invalidMessage={invalidMessage} />
    </>
  );
}
