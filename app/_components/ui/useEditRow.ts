"use client";

import { format, parse } from "date-fns";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function useEditRow<RowType, FormType extends FieldValues>(
  mutationFn: (data: FormType) => void,
) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const { reset } = useForm<FormType>();

  const editRow = (row: RowType) => {
    setShowEditForm(true);
    setSelectedRow(row);
  };

  const submitEditedRow = (data: FormType) => {
    mutationFn(data);
    reset();
    setShowEditForm(false);
  };

  const openEditForm = () => {
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    reset();
    setShowEditForm(false);
  };

  return {
    showEditForm,
    editRow,
    submitEditedRow,
    selectedRow,
    closeEditForm,
    openEditForm,
  };
}
