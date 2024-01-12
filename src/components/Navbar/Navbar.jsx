import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex gap-[20px]">
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="products">Products</Link>
      <Link to="cart">Cart</Link>
      <Link to="login">Login</Link>
    </div>
  );
}
