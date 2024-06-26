/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "../../components/ui/Button";
import Form from "../../components/Forms/Form";
import useForm from "../../hooks/useForm";
import ProductForm from "../../components/Forms/ProductForm";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useUserContext } from "../../context/UserContext";
import { useProductFormProvider } from "../../context/ProductFormContext";
import { useUIContext } from "../../context/UIContext";
import { productSubmitType } from "../../services/constants";

export default function Profile() {
  const { user } = useUserContext();
  const { handleProductSubmit, setProductFormError, dispatch, reFetchData, productFormDetail } = useProductFormProvider();
  const { productFormError, isLoading } = useForm();
  const { isFormOpen, handleFormOpen } = useUIContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    const { productType, productUUID } = productFormDetail;
    if (reFetchData) navigate(`/products/${productType}/${productUUID}`);
  }, [reFetchData]);

  React.useEffect(() => {
    setProductFormError(productFormError);
  }, [isFormOpen]);

  // if (isLoading) return <Loading />;

  return (
    <div className="min-h-[800px]">
      <h1 className="font-semibold text-[22px] text-center">My Profile</h1>
      <div className="flex flex-col gap-[30px] bg-[#434343] p-[20px] mr-[50px] mt-[100px] justify-center items-center">
        <div className="w-[400px] flex justify-between">
          <div>
            <h3 className="uppercase font-[700] text-[12px] tracking-widest text-[#c9c9c9]">Username</h3>
            <span className="text-white">{user[0].username}</span>
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
              onClick={() => {
                handleFormOpen();
                dispatch({ type: productSubmitType.ADD_PRODUCT });
              }}
            />
          )}
        </div>
      </div>
      {isFormOpen && (
        <Form
          values={{
            title: "Add Product",
            handleSubmit: handleProductSubmit,
          }}>
          <ProductForm />
        </Form>
      )}
      {isLoading && <Loading />}
    </div>
  );
}
