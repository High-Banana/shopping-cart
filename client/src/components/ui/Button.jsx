/* eslint-disable react/prop-types */
export default function Button({ title, className = "bg-[gray]", onClick }) {
  const defaultStyle = "px-[30px] py-[15px] rounded-[8px] font-bold text-white duration-[0.3s] hover:scale-105";
  return (
    <>
      <button onClick={onClick} className={`${defaultStyle} ${className}`}>
        {title}
      </button>
    </>
  );
}
