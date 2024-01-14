import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function App() {
  return (
    <>
      <nav className="sticky top-0 z-10">
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
