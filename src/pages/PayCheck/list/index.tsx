import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataGrid from "../../../shared/components/DataGrid";
import {
  faInfo,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Paper } from "@mui/material";
import NewPayCheck from "../new";
import { useState } from "react";

//statesList
const teste = [
  {
    id: 1,
    desc: "lelo",
  },
  {
    id: 2,
    desc: "lelo",
  },
];

export default function ListPayCheck() {
  const [stateList, setStateList] = useState({
    openPopUp: false,
  });

  return (
    <>
      <DataGrid
        rowData={teste}
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
            headerName: "id",
            field: "id",
          },
          {
            headerName: "desc",
            field: "desc",
          },
          {
            headerName: "actions",
            cellRenderer: () => {
              return (
                <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                  <FontAwesomeIcon color="blue" icon={faInfo} />
                  <FontAwesomeIcon color="orange" icon={faPencil} />
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
      />
    </>
  );
}
