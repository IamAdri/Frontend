"use client";
import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useMemo, useRef, useState } from "react";
import { format, parse, parseISO } from "date-fns";
import { ro } from "date-fns/locale";
import { Customer } from "../_interfaces/customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer, getAllCustomers } from "../_lib/data-service";
import Spinner from "./Spinner";

type GridColumnsAndRowsProps = {
  handleShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
};

function GridColumnsAndRows({
  handleShowEditForm,
  handleSelectedCustomer,
}: GridColumnsAndRowsProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const {
    isLoading,
    data: customers,
    error,
  } = useQuery({
    queryKey: ["customers", paginationModel.page, paginationModel.pageSize],
    queryFn: () =>
      getAllCustomers({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      }),
  });
  const handleEditCustomer = (
    row: Customer,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    // console.log(row);
    const parsedDeadlineDate = parse(row.deadline, "dd.MM.yyyy", new Date());
    handleShowEditForm(true);
    handleSelectedCustomer({
      ...row,
      deadline: format(parsedDeadlineDate, "yyyy-MM-dd"),
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const handleDeleteCustomer = (
    row: Customer,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    console.log(row.id);
    mutation.mutate(row.id);
  };

  const columns: GridColDef[] = [
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "contactName", headerName: "Contact Name", width: 200 },
    { field: "contactEmail", headerName: "Contact Email", width: 200 },
    { field: "industry", headerName: "Industry", width: 200 },
    { field: "projectType", headerName: "Project Type", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 200,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <GridActionsCell {...params}>
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleEditCustomer(params.row, e);
            }}
            label="edit"
            showInMenu
          />
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            onClick={(e) => handleDeleteCustomer(params.row, e)}
            label="delete"
            showInMenu
          />
        </GridActionsCell>
      ),
    },
  ];

  const rows: GridRowsProp = useMemo(() => {
    return (
      customers?.data.map((customer) => ({
        ...customer,
        createdAt: format(parseISO(customer.createdAt), "dd.MM.yyyy", {
          locale: ro,
        }),
        deadline: format(parseISO(customer.deadline), "dd.MM.yyyy", {
          locale: ro,
        }),
      })) ?? []
    );
  }, [customers]);

  const rowCountRef = useRef(customers?.meta.totalItems || 0);
  const rowCount = useMemo(() => {
    if (customers?.meta.totalItems !== undefined) {
      rowCountRef.current = customers?.meta.totalItems;
    }
    return rowCountRef.current;
  }, [customers?.meta.totalItems]);

  return (
    <div>
      {customers?.data ? (
        <DataGrid
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          paginationMode="server"
          rowCount={rowCount}
          pageSizeOptions={[3, 5, 10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default GridColumnsAndRows;
