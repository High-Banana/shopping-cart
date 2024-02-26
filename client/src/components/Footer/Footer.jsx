import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#181617] text-white flex justify-around">
      <div className="py-[50px] w-[300px]">
        <img src="/src/assets/images/shopping-cart-icon.jpg" alt="Fake store's logo" className="w-[110px] h-[100px]" />
      </div>
      <div className="py-[50px]">
        <h1 className="text-3xl font-semibold">USEFUL LINKS</h1>
        <ul className="text-[#c1c1c1] flex flex-col gap-[10px] py-[10px]">
          <li className="hover:text-white duration-[0.3s]">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-white duration-[0.3s]">
            <Link to="products">Products</Link>
          </li>
          <li className="hover:text-white duration-[0.3s]">
            <Link to="https://github.com/High-Banana/shopping-cart" target="_blank">
              Repository
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
