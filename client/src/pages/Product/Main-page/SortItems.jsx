/* eslint-disable react/prop-types */

export default function SortItems({ setSortType }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-semibold">Sort by: </span>
      <select
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
