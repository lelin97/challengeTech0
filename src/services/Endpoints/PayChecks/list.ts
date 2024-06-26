import { api } from "../../api";

export default async function listPayCheckEndpoint(config: {
  funcSucesso?: (data: RetornoPayCheck) => void;
  funcErro?: (msg: string, erro: string) => void;
}) {
  const resultado = await api.get<RetornoPayCheck>("/boletos/listar-boleto");

  if (resultado.sucesso === false && config?.funcErro) {
    config.funcErro(resultado.mensagem, resultado.erro);
  }

  if (resultado.sucesso === true && config?.funcSucesso) {
    config.funcSucesso(resultado.data);
  }

  return resultado;
}

export type RetornoPayCheck = {
  descricao: string;
}[];
