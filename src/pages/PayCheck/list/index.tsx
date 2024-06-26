import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataGrid from "../../../shared/components/DataGrid";
import {
  faInfo,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import listPayCheckEndpoint, {
  RetornoPayCheck,
} from "../../../services/Endpoints/PayChecks/list";
import NewPayCheck from "../new/index";

export default function ListPayCheck() {
  const [stateList, setStateList] = useState<{
    openPopUp: boolean;
    boletosCadastrados: RetornoPayCheck;
  }>({
    openPopUp: false,
    boletosCadastrados: [],
  });

  const payCheckSelected = useRef<any>(null);

  async function listAllPayChecks() {
    listPayCheckEndpoint({
      funcSucesso: (data) => {
        setStateList((prev) => ({
          ...prev,
          boletosCadastrados: data,
        }));
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
        toolbar={[
          () => {
            return (
              <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                <FontAwesomeIcon
                  onClick={() => {
                    setStateList((prev) => ({
                      ...prev,
                      openPopUp: true,
                    }));
                  }}
                  size="2x"
                  icon={faPlus}
                />
              </Box>
            );
          },
        ]}
        columnDefs={[
          {
            checkboxSelection: true,
            headerName: "Descrição",
            field: "descricao",
          },
          {
            headerName: "actions",
            cellRenderer: (e: any) => {
              const dados = e.data;
              return (
                <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                  <FontAwesomeIcon
                    color="blue"
                    onClick={(e) => {
                      // console.log(a);
                    }}
                    icon={faInfo}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
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
                    }}
                    color="orange"
                    icon={faPencil}
                  />
                  <FontAwesomeIcon color="red" icon={faTrash} />
                </Box>
              );
            },
          },
        ]}
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
    </>
  );
}
