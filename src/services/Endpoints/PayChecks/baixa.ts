import { RetornoDB } from "../../../types";
import { api } from "../../api";

type idBoletos = string[];

export async function baixaPayCheckEndpoint(config: {
  funcSucesso?: (data: RetornoDB) => unknown;
  funcErro?: (erro?: string, mensagem?: string) => void;
  idBoletos: idBoletos;
  usuario_cadastro: string | null;
}) {
  const resultado = await api.put<never>(
    `/boletos/baixa-boleto/${config.usuario_cadastro}`,
    config.idBoletos,
    { mensagemSucesso: "Baixa do Boleto realizada com sucesso." }
  );

  if (resultado.sucesso === false && config?.funcErro) {
    config.funcErro(resultado.mensagem, resultado.erro);
  }

  if (resultado.sucesso === true && config?.funcSucesso) {
    config.funcSucesso(resultado);
  }

  return resultado;
}
