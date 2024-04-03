/* eslint-disable react/prop-types */
import { createContext } from "react";
import { CartProvider } from "./CartContext";
import { FormProvider } from "./FormContext";

const AppContext = createContext();

export default function ContextProvider({ children }) {
  const appInitialState = {};
  return (
    <AppContext.Provider value={appInitialState}>
      <FormProvider>
        <CartProvider>{children}</CartProvider>
      </FormProvider>
    </AppContext.Provider>
  );
}
