import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HomePage from "../pages/HomePage";
import App from "../pages/App";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import LoginPage from "../pages/LoginPage";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "products", element: <ProductPage /> },
        { path: "cart", element: <Cart /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
