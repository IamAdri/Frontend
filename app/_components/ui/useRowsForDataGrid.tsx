"use client";
import { Paginated } from "@/app/_interfaces/paginated";
import { formatDate } from "@/app/_lib/helpers";
import { GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { useMemo, useRef } from "react";

type DataRowBase = GridValidRowModel & {
  createdAt?: string;
  deadline?: string | null;
  teamMembers?: { name: string }[];
  customers?: { id: number; companyName: string }[];
};

export default function useRowsForDataGrid<T extends DataRowBase>(
  data: Paginated<T> | undefined,
) {
  const rows: GridRowsProp = useMemo(() => {
    return (
      data?.data.map((dataRow) => {
        const teamMembersAssociated = dataRow.teamMembers?.length
          ? dataRow.teamMembers.map((teamMember) => teamMember.name)
          : ["nobody assigned yet"];
        const customersAssociated = dataRow.customers?.length
          ? dataRow.customers.map((customer) => customer.companyName)
          : ["no project assigned yet"];
        console.log(dataRow);
        return {
          ...dataRow,
          createdAt: formatDate(dataRow.createdAt),
          deadline: formatDate(dataRow.deadline),
          teamMembers: teamMembersAssociated,
          projects: customersAssociated,
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

/**export default function useRowsForDataGrid<
  T extends GridValidRowModel & {
    createdAt?: string;
    deadline?: string | null;
  },
>(data: Paginated<T> | undefined) {
  const rows: GridRowsProp = useMemo(() => {
    return (
      data?.data.map((dataRow) => {
        const teamMembersAssociated = dataRow.teamMembers?.length
          ? dataRow.teamMembers.map((teamMember) => teamMember.name)
          : ["nobody assigned yet"];
        let customersAssociated = dataRow.customers?.length
          ? dataRow.customers.map((customer) => customer.name)
          : ["nobody assigned yet"];

        if (!dataRow.createdAt) {
          return {
            ...dataRow,
            projects: customersAssociated,
          };
        }

        return {
          ...dataRow,
          createdAt: formatDate(dataRow.createdAt),
          deadline: formatDate(dataRow.deadline),
          teamMembers: teamMembersAssociated,
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
 */
