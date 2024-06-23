import AppRouter from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export default function App() {
  return (
    <>
      <AppThemeProvider>
        <MenuLateral>
          <AppRouter />
        </MenuLateral>
      </AppThemeProvider>
    </>
  );
}
