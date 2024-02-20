import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/Product/ProductPage";
import Cart from "../pages/Cart";
import LoginPage from "../pages/LoginPage";
import SingleProduct from "../pages/Product/SingleProduct";
import { CartProvider } from "../context/CartContext";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "products", element: <ProductPage /> },
        { path: "products/:productType/:productID", element: <SingleProduct /> },
        { path: "cart", element: <Cart /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
