export default function Loading() {
  return (
    <div className="absolute min-h-screen left-0 right-0 top-0 bottom-0 background-overlay z-10">
      <h3 className="text-6xl font-semibold flex justify-center items-center mt-[300px] gap-[40px] tracking-wider text-white">
        Loading <div className="border-[8px] border-[white_transparent] h-[80px] w-[80px] rounded-[50%] animate-spin"></div>
      </h3>
    </div>
  );
}
