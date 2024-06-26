import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: purple[700],
      dark: purple[800],
      light: purple[500],
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
  },
});
