import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../shared/components/layout";
import Login from "../pages/login";
import Home from "../pages/home";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
