import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function GoBackButton() {
  const navigate = useNavigate();
  return (
    <>
      <button aria-label="Go back" onClick={() => navigate(-1)} className="ml-[30px] mt-[10px] w-[30px]">
        <IoMdArrowBack className="hover:cursor-pointer text-5xl" />
      </button>
    </>
  );
}
