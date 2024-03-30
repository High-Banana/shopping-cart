import { useFormContext } from "../../context/FormContext";

/* eslint-disable react/prop-types */
export default function EmailField({ setEmail }) {
  const { invalidMessage } = useFormContext();
  return (
    <div className="flex flex-col gap-[5px]">
      <label
        htmlFor="email"
        className={`font-[700] text-[12px] text-white uppercase ${invalidMessage.emailValue && "text-[#f14747]"}`}>
        Email
        {invalidMessage.emailValue && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.emailValue}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        id="email"
        autoComplete="username"
        placeholder="Enter your Email"
        className={`h-[40px] p-3 rounded-md border focus:outline-none transition ease-in-out duration-300 ${
          invalidMessage.emailValue ? "focus:ring-[none] border-[red] border-2" : "border-black focus:ring-white focus:ring-2"
        }`}></input>
    </div>
  );
}
