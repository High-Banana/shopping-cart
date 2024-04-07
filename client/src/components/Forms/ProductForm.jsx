/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Button from "../ui/Button";
import { useFormContext } from "../../context/FormContext";
import NameField from "../../pages/Profile/InputFields/NameField";
import ImageField from "../../pages/Profile/InputFields/ImageField";
import DescriptionField from "../../pages/Profile/InputFields/DescriptionField";
import PriceField from "../../pages/Profile/InputFields/PriceField";
import ProductTypeField from "../../pages/Profile/InputFields/ProductTypeField";

export default function ProductForm({ title = "Add Product", productInfo = "", action }) {
  const { handleSubmit, handleFormClose, isVisible, setIsVisible } = useFormContext();

  useEffect(() => {
    setIsVisible(true);
    console.log(productInfo);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 min-h-screen">
      <div
        onClick={(event) => handleFormClose(event)}
        className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-35 backdrop-blur-sm z-[1]"></div>
      <div className={`absolute flex flex-col justify-center items-center right-0 left-0 py-3`}>
        <div
          className={`bg-[#434343] w-[440px] rounded-md z-[2] ${
            isVisible ? "scale-100 duration-200" : "scale-75 duration-200 opacity-15"
          }`}>
          <h2 className="text-white text-2xl font-bold text-center p-6">{title}</h2>
          <form onSubmit={(event) => handleSubmit(event, "productForm", action)}>
            <div className="flex flex-col gap-[20px] p-5">
              <NameField productName={productInfo.product_name} action={action} />
              <ImageField />
              <PriceField productPrice={productInfo.product_price} action={action} />
              <ProductTypeField productType={productInfo.product_type} action={action} />
              <DescriptionField productDescription={productInfo.product_description} action={action} />
            </div>
            <div className="flex gap-[10px] p-4 justify-end items-center bg-[#2f2f2f] rounded-[0_0_6px_6px]">
              <Button
                title="Cancel"
                className="bg-transparent font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:underline"
                onClick={(event) => handleFormClose(event)}
              />
              <Button
                title="Done"
                className="bg-[#5865f2] font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:bg-opacity-70"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
