import { Outlet } from "react-router-dom";
import AppAlert from "../Alert";

export default function AppLayout() {
  return (
    <>
      <AppAlert />
      <Outlet />
    </>
  );
}
