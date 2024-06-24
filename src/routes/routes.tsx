import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../shared/components/layout";
import AutenticadoLayout from "../pages/authenticated";
import { Button } from "@mui/material";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <AutenticadoLayout />,
        path: "/",
      },
      {
        element: <Button>Boletos</Button>,
        path: "/autenticado/boletos",
      },
    ],
  },
]);
