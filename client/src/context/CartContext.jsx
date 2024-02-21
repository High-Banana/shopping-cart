/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [fetchItem, setFetchItem] = useState(false);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  function addToCart(item) {
    setCartItems([...cartItems, item]);
  }

  function toggleOpenCart() {
    setOpenCart(!openCart);
  }

  function toggleFetchItem() {
    setFetchItem(!fetchItem);
  }

  const providerValues = {
    addToCart,
    cartItems,
    openCart,
    toggleOpenCart,
    fetchItem,
    toggleFetchItem,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
