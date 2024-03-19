import { useRef, useState } from "react";
import Button from "../components/ui/Button";
import GoBackButton from "../components/ui/GoBackButton";

export default function LoginPage() {
  const userDataRefs = { email: useRef(null), password: useRef(null) };
  const [invalidInput, setInvalidInput] = useState({
    email: null,
    password: null,
  });
  function handleSignIn(event) {
    event.preventDefault();
    const emailValue = userDataRefs.email.current.value;
    const passwordValue = userDataRefs.password.current.value;
    if (emailValue === "")
      setInvalidInput((prevInput) => ({
        ...prevInput,
        email: true,
      }));
    else
      setInvalidInput((prevInput) => ({
        ...prevInput,
        email: false,
      }));
    if (passwordValue === "")
      setInvalidInput((prevInput) => ({
        ...prevInput,
        password: true,
      }));
    else
      setInvalidInput((prevInput) => ({
        ...prevInput,
        email: false,
      }));
    console.log(emailValue);
    console.log(passwordValue);
  }
  return (
    <>
      <GoBackButton />
      <div className="flex justify-center h-dvh w-[540px] my-[70px] mx-auto">
        <form className="flex flex-col gap-[30px] w-full p-4">
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="email" className="font-semibold text-[18px]">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="username"
              ref={userDataRefs.email}
              className="h-[45px] px-3 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black ease-in-out duration-300"></input>
            {invalidInput.email && <span>Invalid email address</span>}
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="password" className="font-semibold text-[18px]">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              ref={userDataRefs.password}
              className="h-[45px] px-3 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black ease-in-out duration-300"></input>
            {invalidInput.password && <span>Please enter a password</span>}
          </div>
          <Button
            title="Sign In"
            className="bg-[#be2b2b]"
            onClick={(event) => {
              handleSignIn(event);
            }}
          />
        </form>
      </div>
    </>
  );
}
