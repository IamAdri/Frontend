import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

type DataGridTemplateProps<T> = {
  rows: readonly T[];
  columns: GridColDef[];
  rowCount: number;
  paginationModel: PaginationModel;
  setPaginationModel: Dispatch<SetStateAction<PaginationModel>>;
  isLoading: boolean;
  isFetching: boolean;
};

function DataGridTemplate<T>({
  rows,
  columns,
  rowCount,
  paginationModel,
  setPaginationModel,
  isLoading,
  isFetching,
}: DataGridTemplateProps<T>) {
  return (
    <DataGrid
      loading={isLoading || isFetching}
      slotProps={{
        loadingOverlay: {
          variant: "circular-progress",
          noRowsVariant: "circular-progress",
        },
      }}
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      paginationMode="server"
      rowCount={rowCount}
      pageSizeOptions={[3, 5, 10]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
     
    />
  );
}

export default DataGridTemplate;
