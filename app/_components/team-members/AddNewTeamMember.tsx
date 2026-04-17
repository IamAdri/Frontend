"use client";

import { postTeamMember } from "../../_lib/data-service-team-members";
import FormTeamMembers from "./FormTeamMembers";
import { useEditRow } from "../ui/useEditRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormValuesTeamMember } from "@/app/_interfaces/formValuesTeamMember";

function AddNewTeamMember() {
  const queryClient = useQueryClient();
  const mutationAdd = useMutation<void, unknown, FormValuesTeamMember>({
    mutationFn: (data) => postTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
  const { showEditForm, submitEditedRow, closeEditForm, openEditForm } =
    useEditRow(mutationAdd.mutate);
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
          submitEditedRow={submitEditedRow}
          closeEditForm={closeEditForm}
        />
      )}
    </>
  );
}

export default AddNewTeamMember;
