/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PropTypes from "prop-types";

const UIContext = React.createContext();

export function UIProvider({ children }) {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  function handleFormOpen() {
    setIsFormOpen(true);
    // setTimeout for smooth form opening. The time is zero to not make showForm true instantly. Instead form will open first then the duration will come second which is set in Form.jsx css/tailwind class.
    setTimeout(() => {
      setShowForm(true);
    }, 0);
  }

  function handleFormClose() {
    setShowForm(false);
    setTimeout(() => {
      setIsFormOpen(false);
    }, 100);
  }

  const providerValues = { isFormOpen, showForm, handleFormClose, handleFormOpen };

  return <UIContext.Provider value={providerValues}>{children}</UIContext.Provider>;
}

export function useUIContext() {
  return React.useContext(UIContext);
}

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
