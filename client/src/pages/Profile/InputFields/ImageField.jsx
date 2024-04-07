import Button from "../../../components/ui/Button";
import { useFormContext } from "../../../context/FormContext";

export default function ImageField() {
  const { setProductImage, invalidMessage } = useFormContext();
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label className={`uppercase text-[12px] font-bold tracking-wide ${invalidMessage.productImage && "text-[#f14747]"}`}>
        Product Image
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
        accept="image/*"
        name="image"
        className="h-[40px] rounded-md px-3 py-[6px] focus:outline-a transition ease-in-out duration-300 bg-[#202020] file:bg-transparent file:text-white file:border-none"
      />
      {/* <Button title="Upload image" className="w-[100px] h-[20px]" /> */}
    </div>
  );
}
