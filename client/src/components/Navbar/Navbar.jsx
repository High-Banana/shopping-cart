/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CiShoppingCart } from "react-icons/ci";
import { useUserContext } from "../../context/UserContext";
import { IoSearchOutline } from "react-icons/io5";

export default function Navbar() {
  const { getTotalItems, toggleOpenCart } = useCart();
  const { userDetails } = useUserContext();
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollPosition, setLastScrollPosition] = React.useState(0);
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const searchInputRef = React.useRef(null);
  const navigate = useNavigate();

  function handleNavbarScroll() {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > lastScrollPosition) setIsVisible(false);
    else if (lastScrollPosition > currentScrollPosition) setIsVisible(true);
    setLastScrollPosition(currentScrollPosition);
  }

  function handleSearchBarStyle(event) {
    if (searchInputRef.current && searchInputRef.current.contains(event.target)) setIsSearchActive(true);
    else setIsSearchActive(false);
  }

  function handleSearchSubmit() {
    const searchValue = searchInputRef.current.value;
    if (searchValue !== "") navigate(`/products?search=${searchValue}`);
  }

  React.useEffect(() => {
    document.addEventListener("click", handleSearchBarStyle);
    console.log(userDetails);
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handleNavbarScroll);
    return () => window.removeEventListener("scroll", handleNavbarScroll);
  }, [handleNavbarScroll, lastScrollPosition]);

  return (
    <div
      className={`flex justify-between bg-black/55 text-white py-[20px] px-[100px] backdrop-blur-lg shadow-[1px_5px_15px] shadow-black duration-200 ${
        isVisible ? "translate-y-[0px]" : "translate-y-[-100px]"
      }`}>
      <div className="flex gap-[30px] text-[20px] font-[500]">
        <Link to="/" className="navbar-link-hover">
          Home
        </Link>
        <Link to="products" className="navbar-link-hover">
          Products
        </Link>
      </div>
      <div
        className={`flex bg-white px-2 rounded-lg justify-between gap-[5px] duration-300 transition-all ${
          isSearchActive ? "w-[350px] shadow-black shadow-[0_0_15px_4px]" : "w-[200px]"
        }`}>
        <input
          ref={searchInputRef}
          placeholder="Search products"
          className="w-full text-black font-semibold outline-none"></input>
        <button className="text-black text-2xl" onClick={handleSearchSubmit}>
          <IoSearchOutline />
        </button>
      </div>
      <div className="flex gap-[30px] text-[20px] font-[500]">
        <button className="flex items-start navbar-link-hover" onClick={() => toggleOpenCart()}>
          <i className="text-[34px]">
            <CiShoppingCart />
          </i>
          {getTotalItems() !== 0 ? <span className="text-[15px]">{getTotalItems()}</span> : null}
        </button>
        {userDetails.username === null ? (
          <Link to="login" className="navbar-link-hover">
            Login
          </Link>
        ) : (
          <Link to="profile">{userDetails.username}</Link>
        )}
      </div>
    </div>
  );
}
