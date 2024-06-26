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
import registerPayCheckEndpoint from "../../../services/Endpoints/PayChecks/register";
import { usarAlerta } from "../../../shared/contexts/usarAlerta";
import { forwardRef, useImperativeHandle } from "react";
import { editPayCheckEndpoint } from "../../../services/Endpoints/PayChecks/update";
import { subMonths } from "date-fns";

const defaultValues: DefaultPayCheckInput = {
  id_boleto: null,
  descricao: "",
  dt_venc: new Date(),
  valor: "",
  valor_multa: "",
  juros: "",
};

interface INewCheckProps {
  open: boolean;
  closed: () => void;
  listAllPayChecks: () => void;
}
export type RefNewPayCheck = {
  editarPayCheck: (dadosPayCheck: {
    id_boleto: string | null;
    descricao: string;
    dt_venc: Date;
    valor: string;
    valor_multa: string;
    juros: string;
  }) => void;
};

const cadastroPayCheck = forwardRef(function NewPayCheck(
  props: INewCheckProps,
  ref: React.ForwardedRef<RefNewPayCheck>
) {
  const { abrirAlertaSucesso } = usarAlerta();
  const { control, reset, getValues } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(validationRegisterPayCheck),
  });

  const edicao = !!getValues().id_boleto;

  function clearFields() {
    reset({
      id_boleto: null,
      descricao: "",
      dt_venc: new Date(),
      valor: "",
      valor_multa: "",
      juros: "",
    });
  }

  async function createPayCheck(data: any) {
    if (edicao) {
      editPayCheckEndpoint({
        bodyRequest: data,
        funcSucesso: (resultado) => {
          clearFields();
          props.closed();
          abrirAlertaSucesso(
            resultado.mensagem ?? "Boleto editado com sucesso."
          );
          props.listAllPayChecks();
        },
      });
      return;
    }

    registerPayCheckEndpoint({
      body: data,
      funcSucess: (resultado) => {
        clearFields();
        props.closed();
        abrirAlertaSucesso(
          resultado.mensagem ?? "Boleto cadastrado com sucesso."
        );
        props.listAllPayChecks();
      },
    });
  }

  useImperativeHandle(ref, () => {
    return {
      editarPayCheck: (dadosPayCheck: {
        id_boleto: string | null;
        descricao: string;
        dt_venc: Date;
        valor: string;
        valor_multa: string;
        juros: string;
      }) => {
        reset({
          id_boleto: dadosPayCheck.id_boleto,
          descricao: dadosPayCheck.descricao,
          dt_venc: dadosPayCheck.dt_venc,
          valor: String(dadosPayCheck.valor),
          valor_multa: String(dadosPayCheck.valor_multa),
          juros: String(dadosPayCheck.juros),
        });
      },
    };
  });

  return (
    <Popup
      open={props.open}
      onClose={() => {
        props.closed();
        clearFields();
      }}
      title={edicao ? "Edit Pay Check" : "New Pay Check"}
      maxWidth={"md"}
    >
      <Form<DefaultPayCheckInput, DefaultPayCheckOutput>
        control={control as any}
        onSubmit={({ data }) => {
          createPayCheck(data);
        }}
      >
        <Grid container spacing={1}>
          {/* Descrição */}
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

          {/* Data Vencimento */}
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
                  minDate={subMonths(new Date(), 1)}
                  label={`Data Vencimento`}
                />
              )}
            />
          </Grid>

          {/* Valor */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Valor"
                  error={!!error}
                  helperText={error?.message}
                  required={true}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          {/* Valor Multa */}
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
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          {/* Juros */}
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
                  onChange={onChange}
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
});

export default cadastroPayCheck;
