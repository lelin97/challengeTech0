import { ThemeProvider } from "@emotion/react";
import AppRouter from "./routes";
import { themeLight } from "./shared/themes/light";

export default function App() {
  return (
    <>
      <ThemeProvider theme={themeLight}>
        <AppRouter />
      </ThemeProvider>
    </>
  );
}
