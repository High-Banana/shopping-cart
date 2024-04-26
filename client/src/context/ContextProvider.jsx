import PropTypes from "prop-types";
import { createContext } from "react";
import { CartProvider } from "./CartContext";
import { FormProvider } from "./FormContext";
import { UserProvider } from "./UserContext";

const AppContext = createContext();

export default function ContextProvider({ children }) {
  const appInitialState = {};
  return (
    <AppContext.Provider value={appInitialState}>
      <FormProvider>
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </FormProvider>
    </AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
