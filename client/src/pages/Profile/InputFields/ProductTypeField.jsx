import { useFormContext } from "../../../context/FormContext";

export default function ProductTypeField() {
  const { setProductType, invalidMessage } = useFormContext();
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label className={`uppercase text-[12px] font-bold tracking-wide ${invalidMessage.productType && "text-[#f14747]"}`}>
        Product Type
        {invalidMessage.productType && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.productType}
          </span>
        )}
      </label>
      <select
        onChange={(event) => setProductType(event.target.value)}
        type="text"
        name="productType"
        placeholder="Laptop"
        className="h-[40px] rounded-md px-3 focus:outline-none transition ease-in-out duration-300 bg-[#202020]">
        <option value="Laptop">Laptop</option>
        <option value="Mobile">Mobile</option>
        <option value="Desktop">Desktop</option>
        <option value="Mouse">Mouse</option>
        <option value="Keyboard">Keyboard</option>
        <option value="Headphone">Headphone</option>
      </select>
    </div>
  );
}
