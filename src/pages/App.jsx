import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function App() {
  return (
    <>
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
