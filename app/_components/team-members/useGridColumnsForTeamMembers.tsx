import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  GridActionsCell,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";
import { TeamMember } from "@/app/_interfaces/team-member";

type UseGridColumnsParams = {
  openModalForDelete: (id: number) => void;
  editRow: (row:TeamMember) => void;
};

export default function useGridColumnsForTeamMembers({
  openModalForDelete,
  editRow,
}: UseGridColumnsParams) {
  const handleEditTeamMember = (
    row: TeamMember,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    console.log(`try edit ${row.id}`);
    e.preventDefault();
    // console.log(row);
    editRow(row);
  };
  const handleDeleteTeamMember = (
    row: TeamMember,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    openModalForDelete(row.id);
  };
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "contactNumber", headerName: "Contact Number", width: 200 },
    { field: "contactEmail", headerName: "Contact Email", width: 200 },
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
              handleEditTeamMember(params.row, e);
            }}
            label="edit"
            showInMenu
          />
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTeamMember(params.row, e);
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

/**
 * setShowEditForm: SetState<boolean>;
  setSelectedTeamMember: SetState<TeamMember | null>;
 * export default function useGridColumnsForTeamMembers({
  openModalForDelete,
  setShowEditForm,
  setSelectedTeamMember,
}: UseGridColumnsParams) {
  const handleEditTeamMember = (
    row: TeamMember,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    console.log(`try edit ${row.id}`);
    e.preventDefault();
    // console.log(row);
    setShowEditForm(true);
    setSelectedTeamMember(row);
  };
  const handleDeleteTeamMember = (
    row: TeamMember,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    openModalForDelete(row.id);
  }; */
