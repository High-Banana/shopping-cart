import { useState } from "react";
import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import useForm from "../../hooks/useForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSubmit, invalidMessage } = useForm(email, password);

  return (
    <>
      <GoBackButton />
      <div className="flex justify-center h-dvh w-[540px] my-[70px] mx-auto">
        <form className="flex flex-col gap-[30px] w-full p-4" onSubmit={handleSubmit}>
          <EmailField setEmail={setEmail} invalidMessage={invalidMessage} />
          <PasswordField setPassword={setPassword} invalidMessage={invalidMessage} />
          <Button title="Sign In" className="bg-[#be2b2b]" />
        </form>
      </div>
    </>
  );
}
