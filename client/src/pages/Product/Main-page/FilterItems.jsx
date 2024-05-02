import { productTypes } from "../../../services/product";

export default function FilterItems() {
  return (
    <div className="min-w-[200px] border-r border-black">
      <ul className="sticky top-20 mt-[20px] pb-[100px] space-y-5">
        <h1 className="font-bold text-[22px]">Categories</h1>
        <div className="flex flex-col gap-[6px]">
          {productTypes.map((type, index) => {
            return (
              <li
                key={index}
                className="text-[18px] max-w-[90%] px-[10px] py-[2px] font-semibold text-[#363636] tracking-wide hover:bg-[#bbbbbb] rounded-md">
                {type}
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}
