import Button from "./ui/Button";

export default function Error() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-[50px]">
      <h1 className="text-4xl font-semibold tracking-wider">An error occured while loading the data!</h1>
      <Button title="Try Again" className="bg-[#d72c2c]" onClick={() => location.reload()} />
    </div>
  );
}
