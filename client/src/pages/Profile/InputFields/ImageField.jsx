import { useState } from "react";
import { useFormContext } from "../../../context/FormContext";

export default function ImageField() {
  const { setProductImage, invalidMessage } = useFormContext();
  const [displayMessage, setDisplayMessage] = useState(false);
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label
        className={`relative uppercase text-[12px] font-bold tracking-wide ${invalidMessage.productImage && "text-[#f14747]"}`}>
        Product Image
        <span className="ml-4 text-[8px]" onClick={() => setDisplayMessage(!displayMessage)}>
          click me
          <span className={`${displayMessage ? "block absolute top-[-5px] w-[200px] left-[170px] text-[9px]" : "hidden"}`}>
            You can only add images with .png, .jpg, .jpeg, .gif or .webp extensions
          </span>
        </span>
        {invalidMessage.productImage && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.productImage}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setProductImage(event.target.files)}
        type="file"
        accept=".png, .jpg, .jpeg, .webp, .gif"
        name="image"
        className="h-[40px] rounded-md px-3 py-[6px] focus:outline-a transition ease-in-out duration-300 bg-[#202020] file:bg-transparent file:text-white file:border-none"
      />
    </div>
  );
}
