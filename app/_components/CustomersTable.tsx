"use client";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { getAllCustomers } from "../_lib/data-service";

const columns: GridColDef[] = [
  { field: "companyName", headerName: "Company Name", width: 200 },
  { field: "contactName", headerName: "Contact Name", width: 200 },
  { field: "contactEmail", headerName: "Contact Email", width: 200 },
  { field: "industry", headerName: "Industry", width: 200 },
  { field: "projectType", headerName: "Project Type", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "deadline", headerName: "Deadline", width: 200 },
];


function CustomersTable() {
  const [paginationModel, setPaginationModel] = useState({
  pageSize: 3,
  page: 0,
  })
 const {isLoading, data: customers, error} = useQuery({
  queryKey: ["customers", paginationModel.page, paginationModel.pageSize],
  queryFn: ()=>getAllCustomers({
      page: paginationModel.page + 1, // ⚠️ API-ul tău e 1-based
      limit: paginationModel.pageSize,
  }),
 
 })

 const rows: GridRowsProp = useMemo(() => {
  return customers?.data.map((customer) => ({
    ...customer,
    createdAt: new Date(customer.createdAt).toLocaleDateString("ro-RO"),
    deadline: new Date(customer.deadline).toLocaleDateString("ro-RO"),
  })) ?? [];
}, [customers]);
const rowCountRef = useRef(customers?.meta.totalItems || 0)
const rowCount = useMemo(() => {
    if (customers?.meta.totalItems !== undefined) {
      rowCountRef.current = customers?.meta.totalItems;
    }
    return rowCountRef.current;
  }, [customers?.meta.totalItems]);

 return <div>
 { customers?.data ? <DataGrid
  columns={columns}
  rows={rows}
  paginationMode='server'
  rowCount={customers?.meta.totalItems}
  pageSizeOptions={[3, 5, 10]}
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel} /> : <Spinner />}
 </div>
}

export default CustomersTable;


