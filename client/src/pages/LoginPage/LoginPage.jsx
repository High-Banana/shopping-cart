import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import LoginForm from "./LoginForm";
import { useFormContext } from "../../context/FormContext";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const { handleSubmit, isLoading, toggleSignUpForm, openSignUp, user } = useFormContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length !== 0) {
      navigate(-1);
    }
  }, [user, navigate]);

  return (
    <>
      <GoBackButton />
      <div className="flex flex-col w-[580px] my-[70px] mx-auto max-h-[540px] bg-black/75 p-8 gap-3 rounded-lg shadow-[2px_5px_15px_2px] shadow-[rgba(0, 0, 0, 0.35)]">
        <form className="flex flex-col gap-[30px] w-full" onSubmit={handleSubmit} method="POST">
          {!openSignUp ? <LoginForm /> : <SignUpForm />}
          <Button
            title={
              isLoading ? (
                <span className="border-[2px] border-[white_transparent] h-[20px] w-[20px] rounded-[50%] animate-spin"></span>
              ) : (
                "Sign In"
              )
            }
            className="bg-[#be2b2b] hover:scale-[none] hover:bg-[#ad1a1a] flex justify-center"
          />
        </form>
        <span className="text-[14px] text-white">
          {openSignUp ? "Already have an account? " : "Don't have an account? "}
          <button onClick={toggleSignUpForm} className="text-[#4db4e7] font-semibold hover:underline">
            {openSignUp ? "Login here" : "Register here"}
          </button>
        </span>
      </div>
    </>
  );
}
