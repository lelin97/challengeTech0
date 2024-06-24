import AppRouter from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export default function App() {
  return (
    <>
      <AppThemeProvider>
        <AppRouter />
      </AppThemeProvider>
    </>
  );
}
