import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { TeamMember } from "@/app/_interfaces/team-member";

type UseGridColumnsParams = {
  openModalForDelete: (id: number) => void;
  editRow: (row: TeamMember) => void;
};

export default function useGridColumnsForTeamMembers({
  openModalForDelete,
  editRow,
}: UseGridColumnsParams) {
  const columns: GridColDef<TeamMember>[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "contactNumber", headerName: "Contact Number", width: 200 },
    { field: "contactEmail", headerName: "Contact Email", width: 200 },
    { field: "projects", headerName: "Projects", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          key="Edit"
          icon={<EditOutlinedIcon />}
          label="Edit"
          onClick={(e) => {
            e.stopPropagation();
            editRow(params.row);
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
