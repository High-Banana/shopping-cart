/* eslint-disable react/prop-types */
export default function UserNameField({ setUserName, invalidMessage }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label
        htmlFor="username"
        className={`font-[700] text-[12px] text-white uppercase ${invalidMessage.username && "text-[#f14747]"}`}>
        Username
        {invalidMessage.username && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.username}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setUserName(event.target.value)}
        type="text"
        id="username"
        autoComplete="off"
        placeholder="Enter your username"
        className={`h-[40px] p-3 rounded-md border focus:outline-none transition ease-in-out duration-300 ${
          invalidMessage.username ? "focus:ring-[none] border-[red] border-2" : "border-black focus:ring-white focus:ring-2"
        }`}></input>
    </div>
  );
}
