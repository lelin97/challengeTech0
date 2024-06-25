import { api } from "../../api";

export default async function listInfoPayCheckEndpoint(config: {
  codPayCheck: number | null;
  funcSucesso?: (data: RetornoInfoPayCheck) => void;
  funcErro?: (msg: string, erro: string) => void;
}) {
  const resultado = await api.get<RetornoInfoPayCheck>(
    `/boletos/list-info-paycheck/${config.codPayCheck}`
  );

  if (resultado.sucesso === false && config?.funcErro) {
    config.funcErro(resultado.mensagem, resultado.erro);
  }

  if (resultado.sucesso === true && config?.funcSucesso) {
    config.funcSucesso(resultado.data);
  }

  return resultado;
}

export type RetornoInfoPayCheck = {
  DESCRICAO: string;
}[];
