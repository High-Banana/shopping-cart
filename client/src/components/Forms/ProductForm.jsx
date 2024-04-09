import InputField from "../../components/Forms/InputField";
import SelectField from "../../components/Forms/SelectField";
import TextAreaField from "../../components/Forms/TextAreaField";

export default function ProductForm() {
  return (
    <>
      <InputField label="Product Name" type="text" attributes={{ placeholder: "ASUS Nitro 5", name: "productName" }} />
      <InputField label="Product Image" attributes={{ accept: ".png, .jpg, .jpeg, .gif, .webp", name: "image" }} type="file" />
      <InputField label="Product Price" type="number" attributes={{ placeholder: "Enter number only", name: "productPrice" }} />
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
    </>
  );
}
