import { Button, Grid, TextField } from "@mui/material";
import Popup from "../../../shared/components/PopUp";

export default function NewPayCheck({
  open,
  closed,
}: {
  open: boolean;
  closed: () => void;
}) {
  return (
    <Popup
      open={open}
      onClose={() => {
        closed();
      }}
      title="New Pay Check"
      maxWidth={"md"}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField label={"valor"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={"valor1"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={"valor3"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={"valor4"} />
        </Grid>
      </Grid>

      <Grid container item xs={12} display={"flex"} justifyContent={"flex-end"}>
        <Button variant="contained" size="small">
          {"Salvar"}
        </Button>
      </Grid>
    </Popup>
  );
}
