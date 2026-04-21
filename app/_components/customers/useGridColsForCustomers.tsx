import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
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
  const handleEditCustomer = (row: Customer) => {
    // console.log(row);
    const parsedDeadlineDate = parse(row.deadline, "dd.MM.yyyy", new Date());
    const parsedRow = {
      ...row,
      deadline: format(parsedDeadlineDate, "yyyy-MM-dd"),
    };
    editRow(parsedRow);
  };

  const columns: GridColDef<Customer>[] = [
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
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditOutlinedIcon />}
          label="Edit"
          onClick={(e) => {
            e.stopPropagation();
            handleEditCustomer(params.row);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineOutlinedIcon />}
          label="Delete"
          onClick={() => openModalForDelete(params.row.id)}
          showInMenu
        />,
      ],
    },
  ];
  return columns;
}

/**
 *  renderCell: (params) => (
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
 */
