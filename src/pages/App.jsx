import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Link to="/">
        <HomePage />
      </Link>
      {/* <Link to="about">
        <AboutPage />
      </Link> */}
    </>
  );
}

export default App;
