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

  function addToCart(newItem) {
    let isItemInCart = false;
    const updatedItems = cartItems.map((item) => {
      if (item.id === newItem.id) {
        isItemInCart = true;
        item.quantity += 1;
      }
      return item;
    });

    if (isItemInCart) setCartItems(updatedItems);
    else {
      newItem.quantity = 1;
      setCartItems([...cartItems, newItem]);
    }
    console.log(cartItems);
  }

  function removeFromCart(removeItem) {
    const updatedItems = cartItems.map((item) => {
      if (item.id === removeItem.id && removeItem.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedItems);
  }

  function getTotalItems() {
    let total = 0;
    cartItems.map((item) => {
      total += item.quantity;
    });
    return total;
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
    getTotalItems,
    removeFromCart,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
