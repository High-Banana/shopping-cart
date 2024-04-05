import Button from "../../components/ui/Button";

export default function AddProductForm() {
  console.log("add product form");
  return (
    <>
      <div className="absolute min-h-screen w-[100%] top-0 bg-black bg-opacity-35"></div>
      <div className="absolute flex justify-center items-center w-full h-screen top-0 left-0 right-0 bottom-0">
        <div className="bg-[#434343] w-[440px] rounded-md">
          <h2 className="text-white text-2xl font-bold text-center p-6">Add Product</h2>
          <form>
            <div className="p-5">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-2 text-[#c9c9c9]">
                  <label className="uppercase text-[12px] font-bold tracking-wide">Product Name</label>
                  <input
                    type="text"
                    placeholder="Accer Nitro 5"
                    className="h-[40px] rounded-md p-3 focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
                  />
                </div>
                <div className="flex flex-col gap-2 text-[#c9c9c9]">
                  <label className="uppercase text-[12px] font-bold tracking-wide">Product Image</label>
                  <input
                    type="text"
                    className="h-[40px] rounded-md p-3 focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
                  />
                </div>
                <div className="flex flex-col gap-2 text-[#c9c9c9]">
                  <label className="uppercase text-[12px] font-bold tracking-wide">Product Description</label>
                  <textarea
                    type="text"
                    placeholder="Features about product"
                    className="h-[200px] rounded-md p-3 resize-none overflow-hidden focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-[10px] p-4 justify-end items-center bg-[#2f2f2f] rounded-[0_0_6px_0]">
              <Button
                title="Cancel"
                className="bg-transparent font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:underline"
              />
              <Button
                title="Done"
                className="bg-[#5865f2] font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:bg-opacity-70"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
