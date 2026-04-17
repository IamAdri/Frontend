"use client";
import React, { useState } from "react";
import FormCustomers from "./FormCustomers";
import { postCustomer } from "@/app/_lib/data-service-customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormValuesCustomer } from "@/app/_interfaces/formValuesCustomer";
import { useEditRow } from "../ui/useEditRow";

function AddNewCustomer() {
  const queryClient = useQueryClient();
  const mutationAdd = useMutation<void, unknown, FormValuesCustomer>({
    mutationFn: (data) => postCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
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
        <FormCustomers
          submitEditedRow={submitEditedRow}
          closeEditForm={closeEditForm}
        />
      )}
    </>
  );
}

export default AddNewCustomer;
