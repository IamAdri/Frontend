"use client";
import { useState } from "react";

export function useDeleteRow<T>(mutationFn: (id: number) => void) {
  const [open, setOpen] = useState(false);
  const [rowIDToDelete, setRowIDToDelete] = useState<number | null>(null);

  const openModalForDelete = (id: number) => {
    setRowIDToDelete(id);
    setOpen(true);
  };

  const closeModalForDelete = () => {
    setOpen(false);
    setRowIDToDelete(null);
  };

  const confirmFinalDelete = () => {
    if (rowIDToDelete !== null) {
      mutationFn(rowIDToDelete);
    }
    closeModalForDelete();
  };

  return {
    open,
    openModalForDelete,
    closeModalForDelete,
    confirmFinalDelete,
  };
}
