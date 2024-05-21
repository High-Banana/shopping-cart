/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function LoginPage() {
  const { handleUserSubmit, isLoading, user, setUserFormError } = useUserContext();
  const { userFormError } = useForm();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = React.useState(true);

  React.useEffect(() => {
    if (user.length !== 0 && !isLoading) navigate(-1);
  }, [user, isLoading]);

  React.useEffect(() => {
    setUserFormError(userFormError);
  }, [isLoginForm]);

  return (
    <>
      <GoBackButton />
      <div className="flex flex-col w-[580px] my-[70px] mx-auto max-h-[540px] bg-black/75 p-8 gap-3 rounded-lg shadow-[2px_5px_15px_2px] shadow-[rgba(0, 0, 0, 0.35)]">
        <form className="flex flex-col gap-[30px] w-full relative" onSubmit={handleUserSubmit} method="POST">
          {isLoginForm ? <LoginForm /> : <SignUpForm />}
          <Button
            title={
              isLoading ? (
                <span className="border-[2px] border-[white_transparent] h-[20px] w-[20px] rounded-[50%] animate-spin"></span>
              ) : (
                "Continue"
              )
            }
            className={`bg-[#be2b2b] hover:scale-[none] hover:bg-[#ad1a1a] flex justify-center`}
            attributes={isLoading ? { "aria-busy": true, disabled: true } : {}}
          />
        </form>
        <span className="text-[14px] text-white">
          {isLoginForm ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLoginForm(!isLoginForm)} className="text-[#4db4e7] font-semibold hover:underline">
            {isLoginForm ? "Register here" : "Login here"}
          </button>
        </span>
      </div>
    </>
  );
}
