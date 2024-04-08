/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import { useFormContext } from "../../context/FormContext";
import ProductForm from "../../components/Forms/ProductForm";
import Form from "../../components/Forms/Form";
import InputField from "../../components/Forms/InputField";
import useCloseForm from "../../hooks/uesCloseForm";
import SelectField from "../../components/Forms/SelectField";
import TextAreaField from "../../components/Forms/TextAreaField";

export default function Profile() {
  const { user } = useFormContext();
  const { isFormOpen, setIsFormOpen } = useCloseForm();
  useEffect(() => {
    setIsFormOpen(false);
  }, []);
  return (
    <div className="relative min-h-[800px]">
      <h1 className="font-semibold text-[22px] text-center">My Profile</h1>
      <div className="flex flex-col gap-[30px] bg-[#434343] p-[20px] mr-[50px] mt-[100px] justify-center items-center">
        <div className="w-[400px] flex justify-between">
          <div>
            <h3 className="uppercase font-[700] text-[12px] tracking-widest text-[#c9c9c9]">Username</h3>
            <span className="text-white">{user[0].userName}</span>
          </div>
          <Button title="Edit" className="py-[2px] px-[8px] h-[35px] bg-[gray] hover:scale-[none] hover:bg-[#b6b6b6]" />
        </div>
        <div className="w-[400px] flex justify-between">
          <div>
            <h3 className="uppercase font-[700] text-[12px] tracking-widest text-[#c9c9c9]">Email</h3>
            <span className="text-white">{user[0].email}</span>
          </div>
          <Button title="Edit" className="py-[2px] px-[8px] h-[35px] bg-[gray] hover:scale-[none] hover:bg-[#b6b6b6]" />
        </div>
        <div className="w-[400px] flex justify-between">
          <div>
            <h3 className="uppercase font-[700] text-[12px] tracking-widest text-[#c9c9c9]">Password</h3>
            <span className="text-white">{user[0].password}</span>
          </div>
          <Button title="Edit" className="py-[2px] px-[8px] h-[35px] bg-[gray] hover:scale-[none] hover:bg-[#b6b6b6]" />
        </div>
        <div className="flex gap-[10px]">
          <Button
            title="Log Out"
            className="bg-[rgb(255,0,0)] py-[5px] px-[5px] border-2 border-transparent rounded-[3px] font-semibold hover:scale-[none] hover:bg-[rgb(255,0,0,0.7)]"
          />
          <Button
            title="Delete Account"
            className="bg-transparent py-[5px] px-[5px] border-2 border-[red] rounded-[3px] font-semibold hover:scale-[none] hover:bg-[red]"
          />
          {user[0].isAdmin !== 0 && (
            <Button
              title="Add product"
              className="bg-[rgb(0,128,0)] py-[5px] px-[5px] border-2 border-transparent rounded-[3px] font-semibold hover:scale-[none] hover:bg-[rgb(0,128,0,0.5)]"
              onClick={() => setIsFormOpen(true)}
            />
          )}
        </div>
      </div>
      {/* {isFormOpen && <ProductForm action="add" />} */}
      {isFormOpen && (
        <Form title="Add Product">
          <InputField label="Product Name" type="text" attributes={{ placeholder: "ASUS Nitro 5", name: "productName" }} />
          <InputField
            label="Product Image"
            attributes={{ accept: ".png, .jpg, .jpeg, .gif, .webp", name: "image" }}
            type="file"
          />
          <InputField
            label="Product Price"
            type="number"
            attributes={{ placeholder: "Enter number only", name: "productPrice" }}
          />
          <SelectField
            label="Product Type"
            type="text"
            attributes={{ name: "productType" }}
            options={["Laptop", "Mobile", "Desktop", "Mouse", "Keyboard", "Headphone"]}
          />
          <TextAreaField
            label="Product Description"
            className="h-[200px] rounded-md p-3 resize-none overflow-hidden focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
            attributes={{ placeholder: "Features about product", name: "productDescription" }}
          />
        </Form>
      )}
    </div>
  );
}
