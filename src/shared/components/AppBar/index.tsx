import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export default function MainAppbar({
  onBarsClick,
}: {
  onBarsClick: () => void;
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            onBarsClick();
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>
        <Typography
          textAlign="center"
          variant="h2"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Teste
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
