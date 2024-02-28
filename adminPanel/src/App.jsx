import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import Brand from "./pages/Brand/Brand";
import Categories from "./pages/Category/Categories";
import Layout from "./layout/Layout";

const App = () => {
  /// navigate
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "category",
          element: <Categories />
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "brand",
          element: <Brand />
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
