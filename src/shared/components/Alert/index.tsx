import { Snackbar, Alert } from "@mui/material";
import { usarAlerta } from "../../contexts/usarAlerta";

export default function AppAlert() {
  const { open, mensagem, severity, closeAlert } = usarAlerta((state) => state);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={(_, reason) => {
        closeAlert(reason);
      }}
    >
      <Alert severity={severity}>{mensagem}</Alert>
    </Snackbar>
  );
}
