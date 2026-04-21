"use client";

import { postTeamMember } from "../../_lib/data-service-team-members";
import FormTeamMembers from "./FormTeamMembers";
import { useEditRow } from "../ui/useEditRow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCompanyNames } from "@/app/_lib/data-service-customers";

function AddNewTeamMember() {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingCompanyNames,
    isFetching: isFetchingCompanyNames,
    data: companyNames,
    error: errorCompanyNames,
  } = useQuery({
    queryKey: ["team-members"],
    queryFn: () => getAllCompanyNames(),
  });
  const { showEditForm, closeEditForm, openEditForm } = useEditRow();

  const mutationAdd = useMutation({
    mutationFn: postTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      closeEditForm();
    },
  });
  return (
    <>
      <button
        onClick={openEditForm}
        className="self-end border px-5 py-1 cursor-pointer"
      >
        Add
      </button>
      {showEditForm && (
        <FormTeamMembers
          onSubmit={(data) => mutationAdd.mutate(data)}
          onClose={closeEditForm}
          companyNames={companyNames ?? []}
          isSubmitting={mutationAdd.isPending}
        />
      )}
    </>
  );
}

export default AddNewTeamMember;
