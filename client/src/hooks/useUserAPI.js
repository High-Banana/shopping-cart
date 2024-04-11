import { useState } from "react";
import { loginUser, registerUser } from "../services/api/UserAPI";

export default function useUserAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState({});
  const [isLoginForm, setIsLoginForm] = useState(false);

  async function submitUserForm(inputValues) {
    setIsLoading(true);
    setErrorState(undefined);
    try {
      return inputValues.isLoginForm
        ? await loginUser(inputValues.email, inputValues.password)
        : await registerUser(inputValues.email, inputValues.password, inputValues.username);
    } catch (error) {
      setErrorState({ message: error.data, status: error.status });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    isLoginForm,
    setIsLoginForm,
    errorState,
    submitUserForm,
  };
}
