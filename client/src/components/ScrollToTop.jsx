import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
}

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
};
