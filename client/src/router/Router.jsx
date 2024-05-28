import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/Product/Main-page/ProductPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SingleProduct from "../pages/Product/SingleProduct/SingleProduct";
import ContextProvider from "../context/ContextProvider";
import Verification from "../pages/Verification";
import ProfilePage from "../pages/Profile/ProfilePage";
import MyAccount from "../pages/Profile/MyAccount";
import StockPage from "../pages/Profile/StockPage";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "products", element: <ProductPage /> },
        { path: "products/:productType/:productID", element: <SingleProduct /> },
        {
          path: "/profile",
          element: <ProfilePage />,
          children: [
            { index: true, element: <MyAccount /> },
            { path: "stock", element: <StockPage /> },
          ],
        },
        { path: "*", element: <ErrorPage /> },
        { path: "login", element: <LoginPage /> },
      ],
    },
    { path: "/users/confirmation/:emailToken", element: <Verification /> },
  ]);

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}
