"use client";

import FormCustomers from "./FormCustomers";
import { postCustomer } from "@/app/_lib/data-service-customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditRow } from "../ui/useEditRow";

function AddNewCustomer() {
  const { showEditForm, closeEditForm, openEditForm } = useEditRow();
  //Mutate data for adding new customer
  const queryClient = useQueryClient();
  const mutationAdd = useMutation({
    mutationFn: postCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      closeEditForm();
    },
  });
  return (
    <>
      <button
        onClick={openEditForm}
        className="self-end border px-5 py-1 cursor-pointer"
      >
        Add customer
      </button>
      {showEditForm && (
        <FormCustomers
          onSubmit={(data) => mutationAdd.mutate(data)}
          onClose={closeEditForm}
          isSubmitting={mutationAdd.isPending}
        />
      )}
    </>
  );
}

export default AddNewCustomer;
