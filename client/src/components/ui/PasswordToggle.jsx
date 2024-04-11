/* eslint-disable react/prop-types */
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function PasswordToggle({ showPassword, setShowPassword }) {
  return (
    <button
      onClick={(event) => {
        setShowPassword(!showPassword);
        event.preventDefault();
      }}
      className="absolute right-4 top-[133px] text-[20px] text-white cursor-pointer">
      {showPassword ? <LuEye /> : <LuEyeOff />}
    </button>
  );
}
