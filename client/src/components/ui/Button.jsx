/* eslint-disable react/prop-types */
export default function Button({ title, bgColour = "bg-[gray]", width = "auto" }) {
  return (
    <>
      <button
        className={`${bgColour} px-[30px] py-[15px] rounded-[8px] font-bold text-white ${width} duration-[0.3s] hover:scale-105 hover:saturate-[500%]`}>
        {title}
      </button>
    </>
  );
}
