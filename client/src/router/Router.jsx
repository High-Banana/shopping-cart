import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/Product/Main-page/ProductPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SingleProduct from "../pages/Product/SingleProduct/SingleProduct";
import ContextProvider from "../context/ContextProvider";
import Profile from "../pages/Profile/Profile";
import Verification from "../pages/Verification";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "products", element: <ProductPage /> },
        { path: "products/:productType/:productID", element: <SingleProduct /> },
        { path: "/profile", element: <Profile /> },
        { path: "/users/confirmation/:emailToken", element: <Verification /> },
        { path: "*", element: <ErrorPage /> },
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}
