/* eslint-disable react/prop-types */
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function PasswordToggle({ showPassword, setShowPassword }) {
  return (
    <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[42px] text-2xl cursor-pointer">
      {showPassword ? <LuEye /> : <LuEyeOff />}
    </div>
  );
}
