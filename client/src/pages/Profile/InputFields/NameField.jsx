/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useFormContext } from "../../../context/FormContext";

export default function NameField({ productName, action }) {
  const { setProductName, invalidMessage } = useFormContext();
  const inputRef = useRef();
  useEffect(() => {
    setProductName(inputRef.current.value);
  }, []);
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label className={`uppercase text-[12px] font-bold tracking-wide ${invalidMessage.productName && "text-[#f14747]"}`}>
        Product Name
        {invalidMessage.productName && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.productName}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setProductName(event.target.value)}
        ref={inputRef}
        type="text"
        name="productName"
        placeholder="Accer Nitro 5"
        defaultValue={`${action === "edit" ? `${productName}` : ""}`}
        className="h-[40px] rounded-md p-3 focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
      />
    </div>
  );
}
