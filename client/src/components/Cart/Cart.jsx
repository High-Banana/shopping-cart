import React from "react";
import Button from "../ui/Button";
import { useUserContext } from "../../context/UserContext";
import { handleCartCheckout } from "../../hooks/useCheckoutAPI";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { IMAGE_SRC_PATH } from "../../services/constants";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
/* eslint-disable react-hooks/exhaustive-deps */

export default function Cart() {
  const { toggleOpenCart, cartItems, addToCart, getTotalItems, removeFromCart, handleInputValue, calculateTotalPrice, message } =
    useCart();
  const [isVisible, setIsVisible] = React.useState(false);
  const { user } = useUserContext();

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  function handleClosingTransition() {
    setIsVisible(false);
    document.body.style.overflow = "auto";
    setTimeout(() => toggleOpenCart(), 400);
  }

  function handleClick() {
    console.log(user);
    const userID = user[0].userId;
    const productDetails = cartItems.map((item) => {
      const id = item.id;
      const quantity = item.quantity;
      return { id, quantity };
    });
    const totalPrice = calculateTotalPrice();
    // window.open(url, "", "width=500, height=700");
    handleCartCheckout({ userID, productDetails, totalPrice });
  }

  console.log(cartItems);

  return (
    <>
      <div
        onClick={() => handleClosingTransition()}
        className={`fixed w-screen min-h-screen backdrop-blur-sm z-20 transition-all duration-500 ${
          isVisible ? "bg-black bg-opacity-35" : ""
        }`}></div>
      <div
        className={`flex flex-col gap-8 right-0 fixed bg-white h-svh w-[40%] pt-[50px] pb-[20px] px-[30px] z-30 ease-in-out duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex">
          {cartItems.length > 0 && (
            <h1 className="text-3xl">
              Total {getTotalItems() > 1 ? "Items" : "Item"} - {getTotalItems()}
            </h1>
          )}
          <button className="text-3xl right-[30px] absolute" aria-label="close cart" onClick={() => handleClosingTransition()}>
            <RxCross1 />
          </button>
        </div>
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex flex-col gap-[20px] overflow-y-auto scrollbar scrollbar-w-1">
                <div className="flex flex-col gap-[15px]">
                  {cartItems.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="relative flex items-center gap-[10px] bg-[#ececec] rounded-lg h-[120px] p-[7px] duration-300">
                        <img src={`${IMAGE_SRC_PATH}/${item.image}`} className="w-[100px] max-h-full" />
                        <div className="grid grid-cols-[200px_1fr] grid-rows-2 gap-[20px]">
                          <Link to={`products/${item.product_type}/${item.uuid}`} onClick={() => handleClosingTransition()}>
                            <span className="font-semibold col-start-1">{item.product_name}</span>
                          </Link>
                          <button
                            className="justify-self-end"
                            aria-label="delete item"
                            onClick={() => {
                              removeFromCart(item, "deleteItem");
                            }}>
                            <FaTrash />
                          </button>
                          <span className="text-[20px] font-bold row-start-2">
                            NPR {parseFloat(item.product_price).toLocaleString()}
                          </span>
                          <span className="col-start-2 row-start-2 flex gap-[5px] items-center">
                            <button className="text-[14px]" aria-label="decrease quantity" onClick={() => removeFromCart(item)}>
                              <FaMinus />
                            </button>
                            <input
                              className="w-[35px] h-[20px] py-[10px] px-[3px] bg-transparent border-[2px] border-black"
                              type="number"
                              onChange={(e) => handleInputValue(e.target.value, item)}
                              onFocus={(e) => e.target.select()}
                              value={item.quantity}></input>
                            <button className="text-[14px]" aria-label="increase quantity" onClick={() => addToCart(item)}>
                              <FaPlus />
                            </button>
                          </span>
                        </div>
                        <span className="absolute bottom-0 text-xs width-full right-1 text-[red]">{message && message}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="border-t border-[black] flex flex-col">
              <div className="flex justify-between py-[10px] text-[18px]">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">NPR {calculateTotalPrice().toLocaleString()}</span>
              </div>
              <div className="text-center">
                <Button title="Checkout" className="bg-[#009027] w-[100%]" onClick={() => handleClick()} />
              </div>
            </div>
          </>
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
