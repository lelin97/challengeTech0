import { Outlet } from "react-router-dom";
import AppHeader from "../header";

export default function AppLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}
