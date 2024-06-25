import { LocalizationProvider } from "@mui/x-date-pickers";
import AppRouter from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { ptBR } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export default function App() {
  return (
    <>
      <AppThemeProvider>
        <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
          <AppRouter />
        </LocalizationProvider>
      </AppThemeProvider>
    </>
  );
}
