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
import { getAllCompanyNames } from "@/app/_lib/data-service-customers";

function TeamMembersTable() {
  const queryClient = useQueryClient();
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    pageSize: 5,
    page: 0,
  });
  //Fetch to get all team members
  const {
    isLoading,
    isFetching,
    data: teamMembers,
    error,
  } = useQuery({
    queryKey: ["team-members", paginationModel],
    queryFn: () =>
      getAllTeamMembers({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      }),
  });

  //Fetch to get all company names
  const {
    isLoading: isLoadingCompanyNames,
    isFetching: isFetchingCompanyNames,
    data: companyNames,
    error: errorCompanyNames,
  } = useQuery({
    queryKey: ["company-names"],
    queryFn: getAllCompanyNames,
  });

  //Helper function to invalidate query of customers
  const invalidateQueryKey = () =>
    queryClient.invalidateQueries({ queryKey: ["team-members"] });

  const { showEditForm, editRow, selectedRow, closeEditForm } =
    useEditRow<TeamMember>();

  //Manipulate data when editing a team member
  const mutationEdit = useMutation({
    mutationFn: updateTeamMember,
    onSuccess: () => {
      invalidateQueryKey();
      closeEditForm();
    },
  });

  const { openModalForDelete, open, closeModalForDelete, rowIDToDelete } =
    useDeleteRow();

  //Manipulate data when deleting a team member
  const mutationDelete = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      invalidateQueryKey();
      closeModalForDelete();
    },
    onError: () => {
      alert("Could not delete team member!");
    },
  });

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
  // console.log(teamMembers);
  return (
    <div className="">
      <DataGridTemplate {...gridProps} />
      <DialogForDeleteRow
        open={open}
        rowType="team member"
        closeModalForDelete={closeModalForDelete}
        onConfirm={() => rowIDToDelete && mutationDelete.mutate(rowIDToDelete)}
        isLoading={mutationDelete.isPending}
      />
      {showEditForm && selectedRow && (
        <FormTeamMembers
          onClose={closeEditForm}
          onSubmit={(data) => mutationEdit.mutate(data)}
          selectedRow={selectedRow}
          companyNames={companyNames ?? []}
          isSubmitting={mutationEdit.isPending}
        />
      )}
    </div>
  );
}

export default TeamMembersTable;
