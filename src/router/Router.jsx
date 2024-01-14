import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import App from "../pages/App";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/Product/ProductPage";
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
