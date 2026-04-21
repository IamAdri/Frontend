"use client";
import { useCallback, useState } from "react";

export function useDeleteRow() {
  const [open, setOpen] = useState(false);
  const [rowIDToDelete, setRowIDToDelete] = useState<number | null>(null);

  const openModalForDelete = useCallback((id: number) => {
    setRowIDToDelete(id);
    setOpen(true);
  }, []);

  const closeModalForDelete = useCallback(() => {
    setOpen(false);
    setRowIDToDelete(null);
  }, []);

  return {
    open,
    openModalForDelete,
    closeModalForDelete,
    rowIDToDelete,
  };
}
