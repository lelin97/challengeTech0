import { Button, Grid, TextField } from "@mui/material";
import Popup from "../../../shared/components/PopUp";
import {
  DefaultPayCheckInput,
  DefaultPayCheckOutput,
  validationRegisterPayCheck,
} from "../validations";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers";

const defaultValues: DefaultPayCheckInput = {
  descricao: "",
  dt_venc: new Date(),
  valor_multa: "",
  juros: "",
};

export default function NewPayCheck({
  open,
  closed,
}: {
  open: boolean;
  closed: () => void;
}) {
  const { control, reset } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(validationRegisterPayCheck),
  });

  function clearFields() {
    reset({
      descricao: "",
      dt_venc: new Date(),
      valor_multa: "",
      juros: "",
    });
  }

  async function createPayCheck(data: any) {
    console.log("My Data:", data);
  }

  return (
    <Popup
      open={open}
      onClose={() => {
        closed();
        clearFields();
      }}
      title="New Pay Check"
      maxWidth={"md"}
    >
      <Form<DefaultPayCheckInput, DefaultPayCheckOutput>
        control={control as any}
        onSubmit={({ data }) => {
          console.log(data);
          createPayCheck(data);
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="descricao"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Descrição"
                  error={!!error}
                  helperText={error?.message}
                  required={true}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="dt_venc"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  sx={{
                    width: "100%",
                  }}
                  value={value}
                  onChange={onChange}
                  minDate={new Date()}
                  label={`Data Emissão`}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_multa"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Valor Multa"
                  error={!!error}
                  helperText={error?.message}
                  required={true}
                  value={value}
                  onChange={(e) => {
                    const apenasNumeros = e.target.value.replace(/[^0-9]/g, "");
                    onChange(apenasNumeros);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="juros"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Juros"
                  error={!!error}
                  helperText={error?.message}
                  required={true}
                  value={value}
                  onChange={(e) => {
                    const apenasNumeros = e.target.value.replace(/[^0-9]/g, "");
                    onChange(apenasNumeros);
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          display={"flex"}
          justifyContent={"flex-end"}
          mt={1}
        >
          <Button variant="contained" size="small" type="submit">
            {"Salvar"}
          </Button>
        </Grid>
      </Form>
    </Popup>
  );
}
