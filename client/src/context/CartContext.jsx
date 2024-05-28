/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = React.useState([]);
  const [openCart, setOpenCart] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  function addToCart(newItem) {
    let isItemInCart = false;
    const updatedItems = cartItems.map((item) => {
      if (item.id === newItem.id) {
        isItemInCart = true;
        item.quantity += 1;
      }
      if (newItem.quantity > item.product_quantity) {
        item.quantity = item.product_quantity;
        setMessage("No more quantity available");
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
    // set message to null if there was any message/error while adding to cart.
    // for example, if user tries to add more quantity than available, message will be set. Then if the user tries to decrease the quantity, the message will be gone.
    setMessage(null);
  }

  function getTotalItems() {
    return cartItems.reduce((total, item) => {
      return (total += item.quantity);
    }, 0);
  }

  function calculateTotalPrice() {
    return cartItems.reduce((total, currentValue) => {
      return total + parseFloat(currentValue.product_price * currentValue.quantity);
    }, 0);
  }

  function handleInputValue(value, product) {
    // if (parseInt(value > )) return console.log("Cannot enter more than 3 digits");
    const productArray = cartItems.map((item) => {
      if (item.id === product.id) {
        item.quantity = Number(value) === 0 ? 1 : Number(value);
        item.quantity = product.quantity > item.product_quantity ? item.product_quantity : Number(value);
      }
      return item;
    });
    setCartItems(productArray);
  }

  function toggleOpenCart() {
    setOpenCart(!openCart);
  }

  const providerValues = {
    cartItems,
    openCart,
    message,
    addToCart,
    toggleOpenCart,
    getTotalItems,
    removeFromCart,
    handleInputValue,
    calculateTotalPrice,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export function useCart() {
  return React.useContext(CartContext);
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
