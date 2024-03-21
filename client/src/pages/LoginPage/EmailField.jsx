/* eslint-disable react/prop-types */
export default function EmailField({ setEmail, invalidMessage }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor="email" className={`font-[700] text-[14px] uppercase ${invalidMessage.email && "text-[#ec3939]"}`}>
        Email
        {invalidMessage.email && (
          <span className="text-[#ec3939] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.email}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        id="email"
        autoComplete="username"
        placeholder="Enter your Email"
        className={`h-[45px] px-3 rounded-md border border-black focus:outline-none focus:ring-black focus:ring-2 transition ease-in-out duration-300 ${
          invalidMessage.email && "focus:ring-0 border-[red] border-2"
        }`}></input>
    </div>
  );
}
