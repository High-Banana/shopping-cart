import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useCart } from "../context/CartContext";
import Cart from "../components/Cart/Cart";

function App() {
  const { openCart } = useCart();

  return (
    <>
      {openCart && <Cart />}
      <nav className="sticky top-0 z-10">
        <Navbar />
      </nav>
      <main className="min-h-svh">
        <Outlet />
      </main>
      <Footer className="bottom-0" />
    </>
  );
}

export default App;
