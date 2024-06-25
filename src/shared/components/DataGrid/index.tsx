import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { JSX } from "react";
import { Unpacked } from "../../../types";
import { useAppThemeContext } from "../../contexts";

interface DataGridProps<T extends any[]> extends AgGridReactProps<Unpacked<T>> {
  rowData: T;
  toolbar?: (() => JSX.Element)[];
}

export default function DataGrid<T extends any[]>(props: DataGridProps<T>) {
  const { themeName } = useAppThemeContext();

  return (
    <div
      className={`ag-theme-quartz${themeName === "dark" ? "-dark" : ""}`}
      style={{
        height: 500,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 8,
        width: "100%",
      }}
    >
      {props.toolbar && props.toolbar.length ? (
        <Box display="flex" width="100%">
          {props.toolbar.map((El, idx) => (
            <El key={idx} />
          ))}
        </Box>
      ) : null}
      <AgGridReact
        {...props}
        autoSizeStrategy={{
          type: "fitGridWidth",
        }}
      />
    </div>
  );
}
