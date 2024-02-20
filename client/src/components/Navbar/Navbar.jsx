import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  return (
    <div className="flex justify-between bg-black/75 text-white py-[20px] px-[100px] backdrop-blur-lg">
      <div className="flex gap-[30px] text-[20px] font-[500]">
        <Link to="/">Home</Link>
        <Link to="products">Products</Link>
      </div>
      <div className="flex gap-[30px] text-[20px] font-[500]">
        <Link to="cart">Cart {cartItems.length}</Link>
        <Link to="login">Login</Link>
      </div>
    </div>
  );
}
