/* eslint-disable react/prop-types */
import { useState } from "react";
import PasswordToggle from "../../components/ui/PasswordToggle";

export default function PasswordField({ setPassword, invalidMessage }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-[5px] relative">
      <label
        htmlFor="password"
        className={`font-[700] text-[12px] text-white uppercase ${invalidMessage.passwordValue && "text-[#f14747]"}`}>
        Password
        {invalidMessage.passwordValue && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.passwordValue}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setPassword(event.target.value)}
        type={`${showPassword ? "text" : "password"}`}
        id="password"
        autoComplete="current-password"
        placeholder="********"
        className={`h-[40px] p-3 rounded-md border focus:outline-none transition ease-in-out duration-300 ${
          invalidMessage.passwordValue ? "focus:ring-[none] border-[red] border-2" : "border-black focus:ring-white focus:ring-2"
        }`}></input>

      <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />
    </div>
  );
}
