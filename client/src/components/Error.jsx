/* eslint-disable react/prop-types */
import Button from "./ui/Button";

export default function Error({ onClickFunction, errorDetail }) {
  console.log(errorDetail.response.status);
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-[50px]">
      <h1 className="text-4xl font-semibold tracking-wider">An error occured while loading the data!</h1>
      <span className="font-semibold text-2xl">Status Code: {errorDetail.response.status}</span>
      <Button title="Try Again" className="bg-[#d72c2c]" onClick={onClickFunction} />
    </div>
  );
}
