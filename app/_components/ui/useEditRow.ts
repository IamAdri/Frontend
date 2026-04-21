"use client";

import { useCallback, useState } from "react";

export function useEditRow<RowType>() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);

  const editRow = useCallback((row: RowType) => {
    setShowEditForm(true);
    setSelectedRow(row);
  }, []);

  const openEditForm = useCallback(() => {
    setShowEditForm(true);
  }, []);

  const closeEditForm = useCallback(() => {
    setShowEditForm(false);
    setSelectedRow(null);
  }, []);

  return {
    showEditForm,
    editRow,
    selectedRow,
    closeEditForm,
    openEditForm,
  };
}
