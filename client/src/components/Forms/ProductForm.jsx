import { useNavigate } from "react-router-dom";
import InputField from "../../components/Forms/InputField";
import SelectField from "../../components/Forms/SelectField";
import TextAreaField from "../../components/Forms/TextAreaField";
import { useFormContext } from "../../context/FormContext";

export default function ProductForm() {
  const { setProductName, setProductImage, setProductPrice, setProductType, setProductDescription, errorState, isSubmitted } =
    useFormContext();
  const navigate = useNavigate();

  isSubmitted && setTimeout(() => navigate("/products"), 700);

  return (
    <>
      <InputField
        label="Product Name"
        type="text"
        attributes={{ placeholder: "ASUS Nitro 5", name: "productName" }}
        setValue={setProductName}
        errorState={errorState.name}
      />
      <InputField
        label="Product Image"
        attributes={{ accept: ".png, .jpg, .jpeg, .gif, .webp", name: "productImage" }}
        type="file"
        setValue={setProductImage}
        errorState={errorState.image}
      />
      <InputField
        label="Product Price"
        type="number"
        attributes={{ placeholder: "Enter number only", name: "productPrice" }}
        setValue={setProductPrice}
        errorState={errorState.price}
      />
      <SelectField
        label="Product Type"
        type="text"
        attributes={{ name: "productType" }}
        options={["Laptop", "Mobile", "Desktop", "Mouse", "Keyboard", "Headphone"]}
        setValue={setProductType}
        errorState={errorState.type}
      />
      <TextAreaField
        label="Product Description"
        className="h-[200px] rounded-md p-3 resize-none overflow-hidden focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
        attributes={{ placeholder: "Features about product", name: "productDescription" }}
        setValue={setProductDescription}
        errorState={errorState.description}
      />
    </>
  );
}
