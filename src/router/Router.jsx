import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HomePage from "../pages/HomePage";
import App from "../pages/App";
import AboutPage from "../pages/AboutPage";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "about",
      element: <AboutPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
