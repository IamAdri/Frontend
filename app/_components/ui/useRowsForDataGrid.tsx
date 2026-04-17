"use client";
import { Paginated } from "@/app/_interfaces/paginated";
import { GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { ro } from "date-fns/locale";
import { useMemo, useRef } from "react";

export default function useRowsForDataGrid<
  T extends GridValidRowModel & {
    createdAt?: string;
    deadline?: string | null;
  },
>(data: Paginated<T> | undefined) {
  const rows: GridRowsProp = useMemo(() => {
    return (
      data?.data.map((dataRow) => {
        let teamMembersAssociatedToProjects: string[] = [];
        if (dataRow?.teamMembers?.length > 0) {
          dataRow.teamMembers.map((teamMember) => {
            teamMembersAssociatedToProjects.push(teamMember.name);
          });
        }

        if (!dataRow.createdAt) return dataRow;
        if (dataRow?.teamMembers.length === 0) {
          teamMembersAssociatedToProjects.push("nobody assigned yet");
        }
        return {
          ...dataRow,
          createdAt: format(parseISO(dataRow.createdAt), "dd.MM.yyyy", {
            locale: ro,
          }),
          deadline: dataRow.deadline
            ? format(parseISO(dataRow.deadline), "dd.MM.yyyy", {
                locale: ro,
              })
            : null,
          teamMembers: teamMembersAssociatedToProjects,
        };
      }) ?? []
    );
  }, [data]);

  const rowCountRef = useRef(data?.meta.totalItems || 0);
  const rowCount = useMemo(() => {
    if (data?.meta.totalItems !== undefined) {
      rowCountRef.current = data?.meta.totalItems;
    }
    return rowCountRef.current;
  }, [data?.meta.totalItems]);

  return { rows, rowCount };
}
