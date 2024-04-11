/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CiShoppingCart } from "react-icons/ci";
import { useFormContext } from "../../context/FormContext";

export default function Navbar() {
  const { getTotalItems, toggleOpenCart } = useCart();
  const { user } = useFormContext();

  return (
    <div className="flex justify-between bg-black/75 text-white py-[20px] px-[100px] backdrop-blur-lg">
      <div className="flex gap-[30px] text-[20px] font-[500]">
        <Link to="/" className="link-hover">
          Home
        </Link>
        <Link to="products" className="link-hover">
          Products
        </Link>
      </div>
      <div className="flex gap-[30px] text-[20px] font-[500]">
        <button className="flex items-start link-hover" onClick={() => toggleOpenCart()}>
          <i className="text-[34px]">
            <CiShoppingCart />
          </i>
          {getTotalItems() !== 0 ? <span className="text-[15px]">{getTotalItems()}</span> : null}
        </button>
        {user.length === 0 ? (
          <Link to="login" className="link-hover">
            Login
          </Link>
        ) : (
          <Link to="profile">{user[0].username}</Link>
        )}
      </div>
    </div>
  );
}
