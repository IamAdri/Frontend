import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  GridActionsCell,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";
import { format, parse } from "date-fns";
import { Customer } from "@/app/_interfaces/customer";

type UseGridColumnsParams = {
  openModalForDelete: (id: number) => void;
  editRow: (row: Customer) => void;
};

export default function useGridColsForCustomers({
  openModalForDelete,
  editRow,
}: UseGridColumnsParams) {
  const handleEditCustomer = (
    row: Customer,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    console.log(`try edit ${row.id}`);
    e.preventDefault();
    // console.log(row);
    const parsedDeadlineDate = parse(row.deadline, "dd.MM.yyyy", new Date());
    const parsedRow = {
      ...row,
      deadline: format(parsedDeadlineDate, "yyyy-MM-dd"),
    };
    editRow(parsedRow);
  };
  const handleDeleteCustomer = (
    row: Customer,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    openModalForDelete(row.id);
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
      field: "teamMembers",
      headerName: "Team members",
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
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCustomer(params.row, e);
            }}
            label="delete"
            showInMenu
          />
        </GridActionsCell>
      ),
    },
  ];
  return columns;
}
