/* eslint-disable react/prop-types */
import { useState } from "react";
import PasswordToggle from "../../components/ui/PasswordToggle";

export default function PasswordField({ setPassword, invalidMessage }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-[5px] relative">
      <label htmlFor="password" className={`font-[700] text-[14px] uppercase ${invalidMessage.password && "text-[#ec3939]"}`}>
        Password
        {invalidMessage.password && (
          <span className="text-[#ec3939] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.password}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setPassword(event.target.value)}
        type={`${showPassword ? "text" : "password"}`}
        id="password"
        autoComplete="current-password"
        placeholder="********"
        className={`h-[45px] px-3 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black ease-in-out duration-300 ${
          invalidMessage.password && "focus:ring-0 border-2 border-[red]"
        }`}></input>

      <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
    </div>
  );
}
