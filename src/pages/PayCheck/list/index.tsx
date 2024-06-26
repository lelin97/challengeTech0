import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataGrid from "../../../shared/components/DataGrid";
import {
  faCashRegister,
  faInfo,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import listPayCheckEndpoint, {
  RetornoPayCheck,
} from "../../../services/Endpoints/PayChecks/list";
import NewPayCheck from "../new/index";
import deletePayCheckEndpoint from "../../../services/Endpoints/PayChecks/delete";
import { usarAlerta } from "../../../shared/contexts/usarAlerta";
import InfoPayCheck from "../info";
import { compareAsc, format, isToday, set } from "date-fns";
import { baixaPayCheckEndpoint } from "../../../services/Endpoints/PayChecks/baixa";
import { usarTelaLoad } from "../../../shared/contexts/usarTelaLoad";

export default function ListPayCheck() {
  const [stateList, setStateList] = useState<{
    openPopUp: boolean;
    openPopUpInfo: boolean;
    boletosCadastrados: RetornoPayCheck;
    payCheckInfoSelected: any;
    boletosSelecionados: {
      id_boletos: string[];
      usuario_cadastro: string;
    } | null;
  }>({
    openPopUp: false,
    openPopUpInfo: false,
    boletosCadastrados: [],
    payCheckInfoSelected: {
      descricao: "",
      data_vencimento: "",
      valor: "",
      valor_multa: "",
      juros: "",
      valor_total: "",
      dt_baixa: "",
    },
    boletosSelecionados: null,
  });

  const { abrirAlertaSucesso, abrirAlertaErro } = usarAlerta();
  const { setLoading } = usarTelaLoad();
  const payCheckSelected = useRef<any>(null);
  const refDataGrid = useRef<any>(null);

  async function listAllPayChecks() {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
    listPayCheckEndpoint({
      funcSucesso: (data) => {
        setStateList((prev) => ({
          ...prev,
          boletosCadastrados: data,
        }));
      },
    });
    setLoading(false);
  }

  async function baixaBoletos() {
    if (!stateList.boletosSelecionados) {
      return;
    }

    baixaPayCheckEndpoint({
      idBoletos: stateList.boletosSelecionados.id_boletos,
      usuario_cadastro: stateList.boletosSelecionados.usuario_cadastro,
      funcSucesso: () => {
        listAllPayChecks();
        refDataGrid.current.deselectAll();
      },
    });
  }

  function deletePayCheck(id_boleto: string) {
    deletePayCheckEndpoint({
      id_boleto: id_boleto,
      funcSucesso: (resultado) => {
        abrirAlertaSucesso(
          resultado.mensagem ?? "Boleto deletado com sucesso."
        );
        listAllPayChecks();
      },
      funcErro: (mensagem) => {
        abrirAlertaErro(mensagem);
      },
    });
  }

  useEffect(() => {
    listAllPayChecks();
  }, []);

  return (
    <>
      <DataGrid
        rowData={stateList.boletosCadastrados}
        rowSelection="multiple"
        rowMultiSelectWithClick={true}
        onSelectionChanged={(event) => {
          const rows = event.api.getSelectedRows();
          let data = {
            id_boletos: rows
              .filter((v) => v.status_baixa === false)
              .map((v) => v.id_boleto),
            usuario_cadastro: rows[0]?.usuario_cadastro,
          };
          setStateList((prev) => ({
            ...prev,
            boletosSelecionados: data,
          }));
        }}
        toolbar={[
          () => {
            return (
              <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => {
                    baixaBoletos();
                  }}
                  disabled={!stateList.boletosSelecionados?.id_boletos.length}
                >
                  <FontAwesomeIcon icon={faCashRegister} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => {
                    setStateList((prev) => ({
                      ...prev,
                      openPopUp: true,
                    }));
                  }}
                >
                  <FontAwesomeIcon color="blue" icon={faPlus} />
                </IconButton>
              </Box>
            );
          },
        ]}
        columnDefs={[
          {
            headerName: "Descrição",
            field: "descricao",
            checkboxSelection: (e: any) => {
              const dados = e.data;
              return !dados.status_baixa;
            },
          },
          {
            headerName: "R$ Valor",
            field: "valor",
          },
          {
            headerName: "R$ Valor Multa",
            field: "valor_multa",
          },
          {
            headerName: "Data Vencimento",
            field: "data_vencimento",
            valueFormatter: (v) => {
              return format(v.data.data_vencimento, "dd/MM/yyyy");
            },
          },
          {
            headerName: "Status",
            field: "status_baixa",
            cellRenderer: (e: any) => {
              const dados = e.data;
              return (
                <Box
                  display={"flex"}
                  height={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography
                    fontWeight={"bold"}
                    color={!dados.status_baixa ? "red" : "green"}
                  >
                    {!dados.status_baixa ? "Pendente" : "Baixa Realizada"}
                  </Typography>
                </Box>
              );
            },
          },
          {
            headerName: "actions",
            cellRenderer: (e: any) => {
              const dados = e.data;
              return (
                <Box
                  display={"flex"}
                  height={"100%"}
                  gap={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                >
                  <IconButton
                    size="small"
                    ref={(ref) => {
                      if (!ref) return;
                      ref.onclick = (e) => {
                        setStateList((prev) => ({
                          ...prev,
                          openPopUpInfo: true,
                          payCheckInfoSelected: {
                            descricao: dados.descricao,
                            data_vencimento: format(
                              new Date(dados.data_vencimento),
                              "dd/MM/yyyy"
                            ),
                            valor: dados.valor,
                            valor_multa: dados.valor_multa,
                            juros: dados.juros,
                            valor_total: dados.valor_total,
                            dt_baixa: dados.dt_baixa
                              ? format(new Date(dados.dt_baixa), "dd/MM/yyyy")
                              : null,
                          },
                        }));
                        e.stopPropagation();
                      };
                    }}
                  >
                    <FontAwesomeIcon color="blue" icon={faInfo} />
                  </IconButton>

                  <IconButton
                    size="small"
                    ref={(ref) => {
                      if (!ref) return;
                      ref.onclick = (e) => {
                        setStateList((prev) => ({
                          ...prev,
                          openPopUp: true,
                        }));
                        payCheckSelected.current?.editarPayCheck({
                          id_boleto: dados.id_boleto,
                          descricao: dados.descricao,
                          dt_venc: new Date(dados.data_vencimento),
                          valor: dados.valor,
                          valor_multa: dados.valor_multa,
                          juros: dados.juros,
                        });
                        e.stopPropagation();
                      };
                    }}
                  >
                    <FontAwesomeIcon color="orange" icon={faPencil} />
                  </IconButton>

                  <IconButton
                    size="small"
                    ref={(ref) => {
                      if (!ref) return;
                      ref.onclick = (e) => {
                        deletePayCheck(dados.id_boleto);
                        e.stopPropagation();
                      };
                    }}
                  >
                    <FontAwesomeIcon color="red" icon={faTrash} />
                  </IconButton>
                </Box>
              );
            },
          },
        ]}
        ref={refDataGrid}
      />

      <NewPayCheck
        open={stateList.openPopUp}
        closed={() => {
          setStateList((prev) => ({
            ...prev,
            openPopUp: false,
          }));
        }}
        listAllPayChecks={listAllPayChecks}
        ref={payCheckSelected}
      />

      <InfoPayCheck
        dados={stateList.payCheckInfoSelected}
        open={stateList.openPopUpInfo}
        closed={() => {
          setStateList((prev) => ({
            ...prev,
            openPopUpInfo: false,
          }));
        }}
      />
    </>
  );
}
