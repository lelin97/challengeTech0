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
  data_vencimento: string;
  dt_atualizacao: string;
  dt_baixa: string;
  dt_cadastro: string;
  id_boleto: string;
  juros: number;
  status_baixa: boolean;
  usuario_atualizacao: string;
  usuario_cadastro: string;
  valor: number;
  valor_multa: number;
  valor_total: number;
}[];
