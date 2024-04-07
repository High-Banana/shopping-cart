/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useFormContext } from "../../../context/FormContext";

export default function PriceField({ action, productPrice }) {
  const { setProductPrice, invalidMessage } = useFormContext();
  const inputRef = useRef();

  useEffect(() => {
    setProductPrice(inputRef.current.value);
  }, []);

  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label className={`uppercase text-[12px] font-bold tracking-wide ${invalidMessage.productPrice && "text-[#f14747]"}`}>
        Product Price
        {invalidMessage.productPrice && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.productPrice}
          </span>
        )}
      </label>
      <input
        onChange={(event) => setProductPrice(parseFloat(event.target.value))}
        ref={inputRef}
        type="number"
        name="productPrice"
        placeholder="Enter number only"
        defaultValue={`${action === "edit" ? `${productPrice}` : ""}`}
        className="h-[40px] rounded-md p-3 focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
      />
    </div>
  );
}
