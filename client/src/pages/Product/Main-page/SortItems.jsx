import PropTypes from "prop-types";

export default function SortItems({ sortType, setSortType }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-semibold">Sort by: </span>
      <select
        defaultValue={sortType}
        className="bg-transparent font-bold p-1 bg-[#b5b5b5] hover:cursor-pointer"
        onChange={(e) => setSortType(e.target.value)}>
        <option value="ascendingPrice">Price High to Low</option>
        <option value="descendingPrice">Price Low to High</option>
        <option value="ascendingLetter">A - Z</option>
        <option value="descendingLetter">Z - A</option>
        {/* <option value="popularity">Popularity</option> */}
      </select>
    </div>
  );
}

SortItems.propTypes = {
  sortType: PropTypes.string.isRequired,
  setSortType: PropTypes.func.isRequired,
};
