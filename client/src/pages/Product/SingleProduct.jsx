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

export default function SingleProduct() {
  const { productID } = useParams();
  const { addToCart } = useCart();
  const { user } = useFormContext();
  const navigate = useNavigate();
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
        <div className="flex flex-col gap-[20px]">
          <GoBackButton />
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
        </div>
      )}
    </>
  );
}
