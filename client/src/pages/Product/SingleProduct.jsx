/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { IMAGE_SRC_PATH } from "../../services/constants";
import Button from "../../components/ui/Button";
import { useCart } from "../../context/CartContext";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/Error";
import GoBackButton from "../../components/ui/GoBackButton";
import { useFormContext } from "../../context/FormContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import ProductForm from "../../components/Forms/ProductForm";

export default function SingleProduct() {
  const { productID } = useParams();
  const { addToCart } = useCart();
  const { user } = useFormContext();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef();
  const { isFormOpen, setIsFormOpen } = useFormContext();

  function handleClickOutside(event) {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) setShowOptions(false);
  }

  useEffect(() => {
    setIsFormOpen(false);
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const {
    items: [product],
    isLoading,
    errorState: error,
    fetchItems,
  } = useFetch(productID);
  if (error !== undefined) return <Error errorDetail={error} onClickFunction={() => fetchItems(productID)} />;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative flex flex-col gap-[20px] min-h-[800px]">
          <div className="flex justify-between items-center">
            <GoBackButton />
            {user.length !== 0 && user[0].isAdmin !== 0 && (
              <div className="relative">
                <div className="relative flex items-center">
                  <button
                    ref={buttonRef}
                    className="mx-[15px] text-2xl"
                    onClick={() => {
                      setShowOptions(!showOptions);
                    }}>
                    <BsThreeDotsVertical />
                  </button>
                  <div
                    className={`${
                      showOptions ? "flex flex-col gap-2" : "hidden"
                    } absolute top-[1px] right-[35px] bg-[gray] rounded-md text-white`}>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="font-semibold border-b py-2 px-4 hover:underline"
                      aria-label="edit">
                      Edit
                    </button>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="font-semibold pb-2 px-4 hover:underline"
                      aria-label="delete">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-[700px_1fr] mx-[10px] gap-[30px] px-[10px] py-[50px]">
            <div className="max-h-[500px] flex items-center rounded-[10px]">
              <img src={`${IMAGE_SRC_PATH}/${product.image}`} className="object-contain max-h-full" alt={product.product_name} />
            </div>
            <div className="flex flex-col gap-[50px] px-[5px]">
              <h1 className="text-3xl font-[500]">{product.product_name}</h1>
              <p className="text-[#3e3e3e] text-[15px] overflow-auto scrollbar-none">{product.product_description}</p>
              <div className="flex justify-between items-center">
                <span className="font-[700] text-2xl">NPR {parseFloat(product.product_price).toLocaleString()}</span>
                <Button
                  title="Add to cart"
                  className="bg-[#E20D0D]"
                  onClick={() => (user.length !== 0 ? addToCart(product) : navigate("/login"))}
                />
              </div>
            </div>
          </div>
          {isFormOpen && <ProductForm title="Edit Product" productInfo={product} />}
        </div>
      )}
    </>
  );
}
