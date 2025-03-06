import "./table.style.scss";

import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  ColDef,
  ColGroupDef,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps<T, S extends ColDef<T, unknown> | ColGroupDef<T>> {
  rowData: T[];
  columnDefs: S[];
}

const Table = <T, S extends ColDef<T, unknown> | ColGroupDef<T>>({
  rowData,
  columnDefs,
}: TableProps<T, S>): JSX.Element => {
  return (
    <AgGridReact
      className="expense-grid"
      rowData={rowData}
      columnDefs={columnDefs}
    />
  );
};

export default Table;
