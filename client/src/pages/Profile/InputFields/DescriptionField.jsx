import { useFormContext } from "../../../context/FormContext";

export default function DescriptionField() {
  const { setProductDescription, invalidMessage } = useFormContext();
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label className={`uppercase text-[12px] font-bold tracking-wide ${invalidMessage.productDescription && "text-[#f14747]"}`}>
        Product Description
        {invalidMessage.productDescription && (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {invalidMessage.productDescription}
          </span>
        )}
      </label>
      <textarea
        onChange={(event) => setProductDescription(event.target.value)}
        type="text"
        placeholder="Features about product"
        className="h-[200px] rounded-md p-3 resize-none overflow-hidden focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
      />
    </div>
  );
}
