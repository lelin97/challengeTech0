import { RetornoDB } from "../../../types";
import { api } from "../../api";

export default async function registerPayCheckEndpoint(config: {
  body: Body;
  funcSucess?: (resultado: RetornoDB) => void;
  funcError?: (msg: string, error: string) => void;
}) {
  const resultado = await api.post<null>("/boletos/criar-boletos", config.body);

  if (resultado.sucesso === false && config?.funcError) {
    config.funcError(resultado.mensagem, resultado.erro);
  }

  if (resultado.sucesso === true && config?.funcSucess) {
    config.funcSucess(resultado);
  }

  return resultado;
}
