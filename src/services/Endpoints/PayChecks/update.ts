import { RetornoDB } from "../../../types";
import { api } from "../../api";

type requestBody = {
  id_boleto: string;
  descricao: string;
  dt_venc: string;
  valor: number;
  valor_multa: number;
  juros: number;
};

export async function editPayCheckEndpoint(config: {
  funcSucesso?: (data: RetornoDB) => unknown;
  funcErro?: (erro?: string, mensagem?: string) => void;
  bodyRequest: requestBody;
}) {
  const resultado = await api.put<never>(
    `/boletos/atualizar-boleto/${config.bodyRequest.id_boleto}`,
    config.bodyRequest,
    { mensagemSucesso: "Boleto atualizado com sucesso." }
  );

  if (resultado.sucesso === false && config?.funcErro) {
    config.funcErro(resultado.mensagem, resultado.erro);
  }

  if (resultado.sucesso === true && config?.funcSucesso) {
    config.funcSucesso(resultado);
  }

  return resultado;
}

export type RetornoPayCheck = {
  id_boleto: string;
  descricao: string;
  dt_venc: string;
  valor: number;
  valor_multa: number;
  juros: number;
}[];
