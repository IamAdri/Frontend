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
import { FormValuesCustomer } from "@/app/_interfaces/formValuesCustomer";
import { useEditRow } from "../ui/useEditRow";

function CustomersTable() {
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const {
    isLoading,
    isFetching,
    data: customers,
    error,
  } = useQuery({
    queryKey: ["customers", paginationModel.page, paginationModel.pageSize],
    queryFn: () =>
      getAllCustomers({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      }),
  });

  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
  const mutationEdit = useMutation<void, unknown, FormValuesCustomer>({
    mutationFn: (data) => updateCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
  const { openModalForDelete, open, closeModalForDelete, confirmFinalDelete } =
    useDeleteRow(mutationDelete.mutate);
  const { showEditForm, editRow, selectedRow, submitEditedRow, closeEditForm } =
    useEditRow<Customer, FormValuesCustomer>(mutationEdit.mutate);

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

  return (
    <>
      <DataGridTemplate {...gridProps} />
      <DialogForDeleteRow
        open={open}
        rowType="customer"
        closeModalForDelete={closeModalForDelete}
        confirmFinalDelete={confirmFinalDelete}
      />
      {showEditForm && selectedRow?.teamMembers && (
        <FormCustomers
          closeEditForm={closeEditForm}
          submitEditedRow={submitEditedRow}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
}

export default CustomersTable;
