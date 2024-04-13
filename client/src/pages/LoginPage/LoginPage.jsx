/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import LoginForm from "./LoginForm";
import { useFormContext } from "../../context/FormContext";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

export default function LoginPage() {
  const { handleUserSubmit, isLoading, isLoginForm, setIsLoginForm, user, setErrorState } = useFormContext();
  const { errorState } = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.length !== 0 && !isLoading) navigate(-1);
  }, [user, isLoading]);

  React.useEffect(() => {
    setErrorState(errorState);
    console.log(errorState);
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
          {isLoginForm ? "Already have an account? " : "Don't have an account? "}
          <button onClick={() => setIsLoginForm(!isLoginForm)} className="text-[#4db4e7] font-semibold hover:underline">
            {isLoginForm ? "Login here" : "Register here"}
          </button>
        </span>
      </div>
    </>
  );
}
