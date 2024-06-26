import { RetornoDB } from "../../../types";
import { api } from "../../api";

type requestBody = {
  descricao: string;
  dt_venc: string;
  valor: number;
  valor_multa: number;
  juros: number;
};

export default async function registerPayCheckEndpoint(config: {
  body: requestBody;
  funcSucess?: (resultado: RetornoDB) => void;
  funcError?: (msg: string, error: string) => void;
}) {
  const resultado = await api.post<null>("/boletos/criar-boleto", config.body);

  if (resultado.sucesso === false && config?.funcError) {
    config.funcError(resultado.mensagem, resultado.erro);
  }

  if (resultado.sucesso === true && config?.funcSucess) {
    config.funcSucess(resultado);
  }

  return resultado;
}
