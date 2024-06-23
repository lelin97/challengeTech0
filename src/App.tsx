import AppRouter from "./routes";
import { MenuLateral } from "./shared/components";
import { DrawerProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export default function App() {
  return (
    <>
      <AppThemeProvider>
        <DrawerProvider>
          <MenuLateral>
            <AppRouter />
          </MenuLateral>
        </DrawerProvider>
      </AppThemeProvider>
    </>
  );
}
