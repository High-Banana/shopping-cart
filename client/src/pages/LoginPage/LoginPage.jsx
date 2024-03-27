import { useState } from "react";
import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSubmit, invalidMessage } = useForm(email, password);

  return (
    <>
      <GoBackButton />
      <div className="flex flex-col w-[580px] my-[70px] mx-auto max-h-[400px] bg-black/75 p-8 gap-3 rounded-lg shadow-[2px_5px_15px_2px] shadow-[rgba(0, 0, 0, 0.35)]">
        <form className="flex flex-col gap-[30px] w-full" onSubmit={handleSubmit}>
          <EmailField setEmail={setEmail} invalidMessage={invalidMessage} />
          <PasswordField setPassword={setPassword} invalidMessage={invalidMessage} />
          <Button title="Sign In" className="bg-[#be2b2b] hover:scale-[none] hover:bg-[#ad1a1a]" />
        </form>
        <span className="text-[14px] text-white">
          {"Don't have an account?"} <Link className="text-[#4db4e7] font-semibold hover:underline">Register here</Link>
        </span>
      </div>
    </>
  );
}
