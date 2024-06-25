import { RetornoDB } from "../../../types";
import { api } from "../../api";

export default async function deletePayCheckEndpoint(config: {
  codPayCheck: number;
  funcSucesso?: (data: RetornoDB) => void;
  funcErro?: (msg: string, erro: string) => void;
}) {
  const resultado = await api.delete<null>(
    `/boletos/delete/${config.codPayCheck}`
  );

  if (resultado.sucesso === false && config?.funcErro) {
    config.funcErro(resultado.mensagem, resultado.erro);
  }

  if (resultado.sucesso === true && config?.funcSucesso) {
    config.funcSucesso(resultado);
  }

  return resultado;
}
