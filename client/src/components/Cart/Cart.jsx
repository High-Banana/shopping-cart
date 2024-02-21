import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

/* eslint-disable react/prop-types */
export default function Cart() {
  const { toggleOpenCart } = useCart();
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
        className={`right-0 fixed bg-white h-svh w-[35%] z-30 ease-in-out duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}>
        <h1>Cart items</h1>
      </div>
    </>
  );
}
