"use client";

import { Customer } from "@/app/_interfaces/customer";
import { useState } from "react";
import {
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from "@/app/_lib/data-service-customers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useRowsForDataGrid from "../ui/useRowsForDataGrid";
import DataGridTemplate from "../ui/DataGridTemplate";
import DialogForDeleteRow from "../ui/DialogForDeleteRow";
import useGridColsForCustomers from "./useGridColsForCustomers";
import FormCustomers from "./FormCustomers";
import { useDeleteRow } from "../ui/useDeleteRow";
import { useEditRow } from "../ui/useEditRow";

function CustomersTable() {
  const queryClient = useQueryClient();
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    pageSize: 5,
    page: 0,
  });
  //Fetch to get all customers
  const {
    isLoading,
    isFetching,
    data: customers,
    error,
  } = useQuery({
    queryKey: ["customers", paginationModel],
    queryFn: () =>
      getAllCustomers({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      }),
  });

  //Helper function to invalidate query of customers
  const invalidateQueryKey = () =>
    queryClient.invalidateQueries({ queryKey: ["customers"] });

  const { openModalForDelete, open, closeModalForDelete, rowIDToDelete } =
    useDeleteRow();

  //Mutate data when deleting a customer
  const mutationDelete = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      invalidateQueryKey();
      closeModalForDelete();
    },
  });

  const { showEditForm, editRow, selectedRow, closeEditForm } =
    useEditRow<Customer>();

  //Mutate data when editing a customer
  const mutationEdit = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      invalidateQueryKey();
      closeEditForm();
    },
  });
  const { rows, rowCount } = useRowsForDataGrid<Customer>(customers);
  const columns = useGridColsForCustomers({
    openModalForDelete,
    editRow,
  });
  // console.log(rows);
  const gridProps = {
    rows,
    columns,
    rowCount,
    paginationModel,
    setPaginationModel,
    isLoading,
    isFetching,
  };
  // console.log(customers);
  return (
    <>
      <DataGridTemplate {...gridProps} />
      <DialogForDeleteRow
        open={open}
        rowType="customer"
        closeModalForDelete={closeModalForDelete}
        onConfirm={() => rowIDToDelete && mutationDelete.mutate(rowIDToDelete)}
        isLoading={mutationDelete.isPending}
      />
      {showEditForm && selectedRow?.teamMembers && (
        <FormCustomers
          onClose={closeEditForm}
          onSubmit={(data) => mutationEdit.mutate(data)}
          selectedRow={selectedRow}
          isSubmitting={mutationEdit.isPending}
        />
      )}
    </>
  );
}

export default CustomersTable;
