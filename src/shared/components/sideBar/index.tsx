import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuLateralIcones, TIcon } from "./types";
import { menuLateralBotoes } from "./menus";

function MenuIcones({
  icones,
  fecharMenuLateral,
}: {
  icones: MenuLateralIcones;
  fecharMenuLateral: () => void;
}) {
  return icones.map((icone, index) =>
    "rota" in icone ? (
      <Icone
        key={index + 1}
        iconeF={icone}
        fecharMenuLateral={fecharMenuLateral}
      />
    ) : null
  );
}

function Icone({
  iconeF,
  fecharMenuLateral,
}: {
  iconeF: TIcon;
  fecharMenuLateral: () => void;
}) {
  const navigate = useNavigate();
  return (
    <ListItemButton
      onClick={() => {
        navigate(iconeF.rota);
        fecharMenuLateral();
      }}
    >
      <ListItemIcon>
        <FontAwesomeIcon icon={iconeF.icone} />
      </ListItemIcon>
      <ListItemText primary={iconeF.texto} />
    </ListItemButton>
  );
}

export default function SideBar({
  fecharMenuLateral,
  menuLateralAberto,
}: {
  menuLateralAberto: boolean;
  fecharMenuLateral: () => void;
}) {
  return (
    <Slide direction="right" in={menuLateralAberto} mountOnEnter unmountOnExit>
      <Box display="flex" width={200} height="100%">
        <ClickAwayListener
          onClickAway={() => {
            fecharMenuLateral();
          }}
        >
          <Paper
            sx={{
              width: "100%",
              // 72px é a altura do appbar
              minHeight: "calc(100vh - 72px)",
              height: "min-content",
            }}
          >
            <List>
              <MenuIcones
                icones={menuLateralBotoes}
                fecharMenuLateral={fecharMenuLateral}
              />
            </List>
          </Paper>
        </ClickAwayListener>
      </Box>
    </Slide>
  );
}
