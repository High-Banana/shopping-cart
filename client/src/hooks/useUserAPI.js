import { loginUser, registerUser } from "../services/api/UserAPI";

export default function useUserAPI() {
  async function submitUserForm(inputValues) {
    try {
      return inputValues.isLoginForm
        ? await loginUser(inputValues.email, inputValues.password)
        : await registerUser(inputValues.email, inputValues.password, inputValues.username, inputValues.phoneNumber);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { submitUserForm };
}
