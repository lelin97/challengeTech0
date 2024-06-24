import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../shared/components/sideBar";
import MainAppbar from "../../shared/components/AppBar";
import useToggle from "../../shared/hooks/useToggle";

export default function AutenticadoLayout() {
  const [menuLateralAberto, toggleMenuLateral] = useToggle();

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      flexDirection="column"
      bgcolor="white"
    >
      <MainAppbar
        onBarsClick={() => {
          toggleMenuLateral();
        }}
      />
      <Box display="flex" flex={1}>
        <Box
          position="absolute"
          flex={1}
          zIndex={1000}
          height={"calc(100% - 72px)"}
        >
          <SideBar
            menuLateralAberto={menuLateralAberto}
            fecharMenuLateral={() => {
              toggleMenuLateral(false);
            }}
          />
        </Box>
        <Box flex={1} p={1} width="100dvw" bgcolor={"#fafafa"}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
