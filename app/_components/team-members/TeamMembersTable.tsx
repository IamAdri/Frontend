"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTeamMember,
  getAllTeamMembers,
  updateTeamMember,
} from "../../_lib/data-service-team-members";
import useRowsForDataGrid from "../ui/useRowsForDataGrid";
import DataGridTemplate from "../ui/DataGridTemplate";
import DialogForDeleteRow from "../ui/DialogForDeleteRow";
import { TeamMember } from "../../_interfaces/team-member";
import FormTeamMembers from "./FormTeamMembers";
import useGridColumnsForTeamMembers from "./useGridColumnsForTeamMembers";
import { useDeleteRow } from "../ui/useDeleteRow";
import { useEditRow } from "../ui/useEditRow";
import { FormValuesTeamMember } from "@/app/_interfaces/formValuesTeamMember";

function TeamMembersTable() {
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const {
    isLoading,
    isFetching,
    data: teamMembers,
    error,
  } = useQuery({
    queryKey: ["team-members", paginationModel.page, paginationModel.pageSize],
    queryFn: () =>
      getAllTeamMembers({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      }),
  });
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteTeamMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });

  const mutationEdit = useMutation<void, unknown, FormValuesTeamMember>({
    mutationFn: (data) => updateTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
  const { openModalForDelete, open, closeModalForDelete, confirmFinalDelete } =
    useDeleteRow(mutationDelete.mutate);
  const { showEditForm, editRow, selectedRow, submitEditedRow, closeEditForm } =
    useEditRow<TeamMember, FormValuesTeamMember>(mutationEdit.mutate);
  const { rows, rowCount } = useRowsForDataGrid<TeamMember>(teamMembers);
  const columns = useGridColumnsForTeamMembers({
    openModalForDelete,
    editRow,
  });

  const gridProps = {
    rows,
    columns,
    rowCount,
    paginationModel,
    setPaginationModel,
    isLoading,
    isFetching,
  };

  return (
    <div className="">
      <DataGridTemplate {...gridProps} />
      <DialogForDeleteRow
        open={open}
        rowType="team member"
        closeModalForDelete={closeModalForDelete}
        confirmFinalDelete={confirmFinalDelete}
      />
      {showEditForm && selectedRow && (
        <FormTeamMembers
          closeEditForm={closeEditForm}
          submitEditedRow={submitEditedRow}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
}

export default TeamMembersTable;
