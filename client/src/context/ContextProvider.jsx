import PropTypes from "prop-types";
import { createContext } from "react";
import { CartProvider } from "./CartContext";
import { FormProvider } from "./FormContext";
import { UserProvider } from "./UserContext";
import { ProductFormProvider } from "./ProductFormContext";
import { UIProvider } from "./UIContext";

const AppContext = createContext();

export default function ContextProvider({ children }) {
  const appInitialState = {};
  return (
    <AppContext.Provider value={appInitialState}>
      <UIProvider>
        <FormProvider>
          <UserProvider>
            <ProductFormProvider>
              <CartProvider>{children}</CartProvider>
            </ProductFormProvider>
          </UserProvider>
        </FormProvider>
      </UIProvider>
    </AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
