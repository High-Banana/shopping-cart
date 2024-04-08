/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormContext } from "../../context/FormContext";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function DeleteForm({ setOpenDeleteForm, productInfo }) {
  const { handleFormClose, isVisible, setIsVisible, handleSubmit, setProductUUID } = useFormContext();
  const navigation = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    setProductUUID(productInfo.uuid);
  }, []);

  return (
    <div className="absolute min-h-screen top-0 left-0 right-0 bottom-0">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-35 backdrop-blur-sm z-[1]"></div>
      <div className="z-[2] absolute flex flex-col justify-center min-h-[500px] items-center right-0 left-0">
        <div
          className={`bg-[#434343] w-[440px] rounded-md z-[2] ${
            isVisible ? "scale-100 duration-200" : "scale-75 duration-200 opacity-15"
          }`}>
          <h1 className="text-white text-2xl font-bold text-center pt-4">Delete Product</h1>
          <form onSubmit={(event) => handleSubmit(event, "productForm", "delete")}>
            <h2 className="text-white text-1xl font-bold p-6">Are you sure you want to delete this product?</h2>
            <div className="flex gap-[10px] p-4 justify-end items-center bg-[#2f2f2f] rounded-[0_0_6px_6px]">
              <Button
                title="Cancel"
                className="bg-transparent font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:underline"
                onClick={(event) => {
                  handleFormClose(event);
                  setTimeout(() => setOpenDeleteForm(false), 100);
                }}
              />
              <Button
                title="Delete"
                className="bg-[#5865f2] font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:bg-opacity-70"
                onClick={() => {
                  setTimeout(() => {
                    setOpenDeleteForm(false);
                    navigation("/products");
                  }, 100);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
