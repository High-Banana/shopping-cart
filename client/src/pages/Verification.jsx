/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Verification() {
  const { emailToken } = useParams();
  React.useEffect(() => {
    axios
      .get(`/api/users/confirmation/${emailToken}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>Your email has been confirmed</h1>
    </div>
  );
}
