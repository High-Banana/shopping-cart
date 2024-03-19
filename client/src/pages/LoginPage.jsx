import Button from "../components/ui/Button";

export default function LoginPage() {
  function handleSignIn(event) {
    event.preventDefault();
  }
  return (
    <div className="flex justify-center items-center h-dvh w-[540px] m-auto">
      <form className="flex flex-col gap-[30px] w-full p-4">
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="email" className="font-semibold text-[18px]">
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="username"
            className="h-[45px] px-3 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black ease-in-out duration-300"></input>
        </div>
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="password" className="font-semibold text-[18px]">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            className="h-[45px] px-3 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black ease-in-out duration-300"></input>
        </div>
        <Button title="Sign In" className="bg-[#be2b2b]" onClick={(event) => handleSignIn(event)} />
      </form>
    </div>
  );
}
