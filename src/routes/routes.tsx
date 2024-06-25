import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../shared/components/layout";
import AutenticadoLayout from "../pages/authenticated";
import ListPayCheck from "../pages/PayCheck/list";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <AutenticadoLayout />,
        path: "/",
      },
      {
        element: <ListPayCheck />,
        path: "/autenticado/boletos",
      },
    ],
  },
]);
