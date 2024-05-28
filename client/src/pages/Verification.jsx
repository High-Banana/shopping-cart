/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Verification() {
  const { emailToken } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get(`/api/users/confirmation/${emailToken}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleClick() {
    navigate("/login");
  }

  return (
    <div className="flex flex-col justify-center items-center h-dvh gap-10">
      <h1 className="text-4xl font-semibold">Your email has been verified</h1>
      <Button title="Go back to login" className="bg-[#18577e] w-[30%]" onClick={handleClick} />
    </div>
  );
}
