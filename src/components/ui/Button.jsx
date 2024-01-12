/* eslint-disable react/prop-types */
export default function Button({ title, bgColour, width = "auto" }) {
  return (
    <>
      <button
        className={`${bgColour} px-[30px] py-[15px] rounded-[8px] font-bold text-white ${width} transition-[0.3s] hover:scale-105`}
      >
        {title}
      </button>
    </>
  );
}
