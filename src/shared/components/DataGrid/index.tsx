import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ForwardedRef, JSX, forwardRef } from "react";
import { Unpacked } from "../../../types";
import { useAppThemeContext } from "../../contexts";

interface DataGridProps<T extends any[]> extends AgGridReactProps<Unpacked<T>> {
  rowData: T;
  toolbar?: (() => JSX.Element)[];
}

function DataGrid<T extends any[]>(
  props: DataGridProps<T>,
  ref: ForwardedRef<any>
) {
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
        ref={ref}
        autoSizeStrategy={{
          type: "fitGridWidth",
        }}
      />
    </div>
  );
}

export default forwardRef(DataGrid);
