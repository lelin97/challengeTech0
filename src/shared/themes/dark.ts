import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: purple[700],
      dark: purple[800],
      light: purple[500],
      contrastText: "#ffffff",
    },
    background: {
      paper: "#303134",
      default: "#202124",
    },
  },
});
