import { Box, Grid, Paper, Typography } from "@mui/material";
import Popup from "../../../shared/components/PopUp";
import { useMemo } from "react";

function AllInfo({ title, field }: { title: string; field: any }) {
  return (
    <Box gap={1} display={"flex"} flexDirection={"column"}>
      <Typography color="primary" variant="caption" fontWeight={800}>
        {title}
      </Typography>
      <Typography color="body2">{field}</Typography>
    </Box>
  );
}

export default function InfoPayCheck({
  dados,
  open,
  closed,
}: {
  dados: any;
  open: boolean;
  closed: () => void;
}) {
  const labels = {
    descricao: "Descrição",
    data_vencimento: "Data Vencimento",
    valor: "Valor",
    valor_multa: "Valor Multa",
    juros: "Juros",
    valor_total: "Valor Total",
    dt_baixa: "Data Baixa",
  };
  const info = useMemo(() => {
    return (
      <Grid container>
        <Paper
          variant="outlined"
          component={Box}
          display="flex"
          width={"100%"}
          flexWrap={"wrap"}
          p={2}
          gap={2}
        >
          {dados
            ? Object.keys(dados)
                .filter((v) =>
                  Object.keys(labels).some((key) => key === v && !!dados[v])
                )
                .map((v, i) => {
                  if (v !== "dt_atualizacao" && v !== "dt_cadastro") {
                    return (
                      <AllInfo
                        key={i}
                        title={labels[v as keyof typeof labels].toUpperCase()}
                        field={dados[v]}
                      />
                    );
                  }
                })
            : null}
        </Paper>
      </Grid>
    );
  }, [dados, dados?.id_boleto]);

  return (
    <Popup
      open={open}
      onClose={closed}
      title="Information Pay Check"
      maxWidth={"md"}
    >
      {info}
    </Popup>
  );
}
