import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { IMAGE_SRC_PATH } from "../../services/constants";

/* eslint-disable react/prop-types */
export default function Cart() {
  const { toggleOpenCart, cartItems, toggleFetchItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  function handleClosingTransition() {
    setIsVisible(false);
    setTimeout(() => toggleOpenCart(), 400);
  }

  return (
    <>
      <div
        onClick={() => handleClosingTransition()}
        className={`fixed w-screen min-h-screen backdrop-blur-[4px] z-20 transition-all duration-500 ${
          isVisible ? "bg-black bg-opacity-35" : ""
        }`}></div>
      <div
        className={`right-0 fixed bg-white h-svh w-[35%] py-[50px] px-[30px] z-30 ease-in-out duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}>
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-[15px]">
            <h1 className="text-3xl mb-[20px]">
              Total {cartItems.length > 1 ? "Items" : "Item"} - {cartItems.length}
            </h1>
            {cartItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={`products/${item.product_type}/${item.id}`}
                  onClick={() => {
                    handleClosingTransition();
                    toggleFetchItem();
                  }}>
                  <div className="flex items-center gap-[10px] bg-[#ececec] rounded-lg h-[120px] p-[7px]">
                    <img src={`${IMAGE_SRC_PATH}/${item.image}`} className="w-[130px]" />
                    <div className="flex flex-col gap-[20px]">
                      <span className="font-semibold">{item.product_name}</span>
                      <span className="text-[20px] font-bold">NPR {parseFloat(item.product_price).toLocaleString("en-US")}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="m-auto h-full flex flex-col justify-center items-center gap-[30px]">
            <h1 className="text-[25px] font-bold tracking-widest">YOUR CART IS EMPTY</h1>
            <Link
              to="products"
              className="underline font-semibold hover:scale-[1.2] duration-500"
              onClick={() => handleClosingTransition()}>
              SHOP NOW
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
