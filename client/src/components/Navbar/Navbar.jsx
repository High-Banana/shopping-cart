import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CiShoppingCart } from "react-icons/ci";

export default function Navbar() {
  const { cartItems } = useCart();
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
        <Link to="cart" className="flex items-start link-hover">
          <i className="text-[34px]">
            <CiShoppingCart />
          </i>
          {cartItems.length != "0" ? <span className="text-[15px]">{cartItems.length}</span> : ""}
        </Link>
        <Link to="login" className="link-hover">
          Login
        </Link>
      </div>
    </div>
  );
}
