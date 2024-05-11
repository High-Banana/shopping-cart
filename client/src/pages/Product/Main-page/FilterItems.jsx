import React from "react";
import PropTypes from "prop-types";
import { productTypes } from "../../../services/product";

export default function FilterItems({ filterType, setFilterType }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, [filterType]);

  function handleFilterItems(index) {
    setFilterType(productTypes[index]);
    setSelectedIndex(index);

    if (selectedIndex === index) {
      setSelectedIndex(null);
      setFilterType(null);
    }
  }

  const categoriesList = productTypes.map((type, index) => {
    const isSelected = index === selectedIndex;
    const styles = `relative flex justify-between items-center max-w-[90%] px-[10px] py-[2px] font-semibold tracking-wide rounded-md hover:cursor-default ${
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
      <ul className="sticky top-20 mt-[20px] pb-[100px] space-y-5">
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
