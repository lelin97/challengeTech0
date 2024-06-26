import { CircularProgress, Container, Modal } from "@mui/material";
import { usarTelaLoad } from "../../contexts/usarTelaLoad";

export default function LoadScreen() {
  const isLoading = usarTelaLoad((state) => state.isLoading);

  return (
    <Modal
      open={isLoading}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
        },
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Container>
    </Modal>
  );
}
