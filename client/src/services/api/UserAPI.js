import axios from "axios";

export async function loginUser(email, password) {
  return axios
    .post("/api/users/login", { email, password })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}

export async function registerUser(email, password, username, phoneNumber) {
  console.log(phoneNumber);
  return axios
    .post("/api/users/register", { email, password, username, phoneNumber })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}
