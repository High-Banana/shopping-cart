/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [fetchItem, setFetchItem] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(cartItems);
    setTotalPrice(calculateTotalPrice());
    console.log(totalPrice);
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
  }

  function removeFromCart(itemToRemove, type = "decreaseQuantity") {
    if (type === "decreaseQuantity") {
      const updatedItems = cartItems.map((item) => {
        if (item.id === itemToRemove.id && itemToRemove.quantity > 1) {
          item.quantity -= 1;
        }
        return item;
      });
      setCartItems(updatedItems);
    } else if (type === "deleteItem") setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
  }

  function getTotalItems() {
    let total = 0;
    cartItems.map((item) => {
      total += item.quantity;
    });
    return total;
  }

  function calculateTotalPrice() {
    return cartItems
      .reduce((total, currentValue) => {
        let price = parseFloat(currentValue.product_price);
        price *= currentValue.quantity;
        return total + price;
      }, 0)
      .toLocaleString();
  }

  function handleInputValue(value, product) {
    if (value.length > 3) return console.log("Cannot enter more than 3 digits");
    const productArray = cartItems.map((item) => {
      if (item.id === product.id) {
        item.quantity = Number(value) === 0 ? 1 : Number(value);
      }
      return item;
    });
    setCartItems(productArray);
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
    handleInputValue,
    totalPrice,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
