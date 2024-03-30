import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/Product/Main-page/ProductPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SingleProduct from "../pages/Product/SingleProduct";
import { CartProvider } from "../context/CartContext";
import { FormProvider } from "../context/FormContext";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "products", element: <ProductPage /> },
        { path: "products/:productType/:productID", element: <SingleProduct /> },
        { path: "*", element: <ErrorPage /> },
        {
          path: "login",
          element: (
            <FormProvider>
              <LoginPage />
            </FormProvider>
          ),
        },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
