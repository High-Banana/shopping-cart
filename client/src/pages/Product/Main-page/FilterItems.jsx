import React from "react";
import PropTypes from "prop-types";
import { productTypes } from "../../../services/product";
import { useLocation, useNavigate } from "react-router-dom";

export default function FilterItems({ filterType, setFilterType }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });

    // this part is only for UI purpose. If filterType is null, remove the styling that makes it look like a category is selected to filter. This is done when a product is searched while filter category is selected.
    if (filterType === null) setSelectedIndex(null);
  }, [filterType]);

  function handleFilterItems(index) {
    setFilterType(productTypes[index]);
    setSelectedIndex(index);

    if (selectedIndex === index) {
      setSelectedIndex(null);
      setFilterType(null);
    }

    // If the user searches for product then selects any category to filter, turn the searching off with this.
    if (location.search !== "") navigate("/products");
  }

  const categoriesList = productTypes.map((type, index) => {
    const isSelected = index === selectedIndex;
    const styles = `relative flex justify-between items-center max-w-[90%] px-[10px] py-[2px] font-semibold tracking-wide rounded-md hover:cursor-default duration-300 transition-all ${
      isSelected ? "bg-black text-white py-[4px] text-[20px]" : "hover:bg-[#bbbbbb] text-[#363636] text-[18px]"
    }`;
    return (
      <li key={index} className={styles} onClick={() => handleFilterItems(index)}>
        {type} {isSelected && <span className="font-semibold">-</span>}
      </li>
    );
  });

  return (
    <div className="min-w-[200px] border-r border-black">
      <ul className="sticky top-10 mt-[20px] pb-[100px] space-y-5">
        <h1 className="font-bold text-[22px]">Categories</h1>
        <div className="flex flex-col gap-[6px]">{categoriesList}</div>
      </ul>
    </div>
  );
}

FilterItems.propTypes = {
  filterType: PropTypes.string,
  setFilterType: PropTypes.func.isRequired,
};
