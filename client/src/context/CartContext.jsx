/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [fetchItem, setFetchItem] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems, value]);

  function addToCart(newItem) {
    let isItemInCart = false;
    const repeatedItem = cartItems.map((item) => {
      if (item.id === newItem.id) {
        isItemInCart = true;
        // item.quantity += 1;
        item.quantity += 1;
        // setValue(item.quantity);
      }
      return item;
    });

    if (isItemInCart) setCartItems(repeatedItem);
    else {
      newItem.quantity = 1;
      setCartItems([...cartItems, newItem]);
      setValue(newItem.quantity);
    }
    console.log(cartItems);
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
    value,
    setValue,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
