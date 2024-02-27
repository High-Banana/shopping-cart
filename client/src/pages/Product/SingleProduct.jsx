/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { fetchProductByID } from "../../services/api/Fetch";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { IMAGE_SRC_PATH } from "../../services/constants";
import Button from "../../components/ui/Button";
import { useCart } from "../../context/CartContext";

export default function SingleProduct() {
  const { productID } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductByID(productID)
      .then(([product]) => {
        setSingleProduct(product);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [productID]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-[700px_1fr] mx-[10px] gap-[30px] px-[10px] py-[50px]">
          <div className="max-h-[500px] flex items-center rounded-[10px]">
            <img
              src={`${IMAGE_SRC_PATH}/${singleProduct.image}`}
              className="object-contain max-h-full"
              alt={singleProduct.product_name}
            />
          </div>
          <div className="flex flex-col gap-[50px] px-[5px]">
            <h1 className="text-3xl font-[500]">{singleProduct.product_name}</h1>
            <p className="text-[#3e3e3e] text-[15px] overflow-auto scrollbar-none">{singleProduct.product_description}</p>
            <div className="flex justify-between items-center">
              <span className="font-[700] text-2xl">NPR {parseFloat(singleProduct.product_price).toLocaleString()}</span>
              <Button title="Add to cart" className="bg-[#E20D0D]" onClick={() => addToCart(singleProduct)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
