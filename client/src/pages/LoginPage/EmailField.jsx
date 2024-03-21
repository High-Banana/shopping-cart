/* eslint-disable react/prop-types */
export default function EmailField({ setEmail, invalidMessage }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor="email" className="font-semibold text-[18px]">
        Email
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
      {invalidMessage.email && <span className="text-[#ec3939] font-semibold">{invalidMessage.email}</span>}
    </div>
  );
}
