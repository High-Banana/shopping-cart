import { useState } from "react";
import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidMessage, setinvalidMessage] = useState({
    email: "",
    password: "",
  });

  function handleSignIn(event) {
    event.preventDefault();
    validateForm()
      .then((message) => {
        setinvalidMessage({ email: "", password: "" });
        console.log(message);
      })
      .catch((error) => {
        switch (error) {
          case "empty-email":
            return setinvalidMessage({ email: "Please enter Email" });
          case "empty-password":
            return setinvalidMessage({ password: "Please enter password" });
          default:
            alert(error);
        }
      });
    console.log({ email, password });
  }

  function validateForm() {
    return new Promise((resolve, reject) => {
      if (email === "") reject("empty-email");
      else if (password === "") reject("empty-password");
      else resolve("Form is valid");
    });
  }
  return (
    <>
      <GoBackButton />
      <div className="flex justify-center h-dvh w-[540px] my-[70px] mx-auto">
        <form className="flex flex-col gap-[30px] w-full p-4" onSubmit={handleSignIn}>
          <EmailField setEmail={setEmail} invalidMessage={invalidMessage} />
          <PasswordField setPassword={setPassword} invalidMessage={invalidMessage} />
          <Button title="Sign In" className="bg-[#be2b2b]" />
        </form>
      </div>
    </>
  );
}
