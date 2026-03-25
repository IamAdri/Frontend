"use client";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Paginated } from "../_interfaces/paginated";
import { Customer } from "../_interfaces/customer";
import { useQuery } from "@tanstack/react-query";
/*
const rows: GridRowsProp = [
  {
    id: 1,
    company_name: "Adrielle",
    contact_name: "Adriana Sprincean",
    contact_email: "adrielle@yahoo.com",
    industry: "E-commerce online shop",
    project_type: "CRM",
    status: "in process",
    created_at: "01.03.2026",
    deadline: "01.08.2026",
  },
];*/

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
interface CustomersTableProps {
  customers: Paginated<Customer>; // array de Customer
}

async function getAllCustomers(): Promise<Paginated<Customer>> {
  try {
    const response = await fetch("http://localhost:3001/customers/?limit=2&page=1", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not get customers!");
    }
    const data: Paginated<Customer> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      data:[],
      meta:{
        itemsPerPage:0,
        totalPages:1,
        currentPage:1,
        totalItems:0
      },
      links: {
        first: "",
        last: "",
        current: "",
        next:"",
        previous:""
      }
    }
  }
}


function CustomersTable({ customers }: CustomersTableProps) {
  const [customersPageList, setCustomersPageList] = useState(customers);
  const [paginationModel, setPaginationModel] = useState({
  pageSize: customers.meta.itemsPerPage,
  page: customers.meta.currentPage,
});
const [loading, setLoading] = useState(false);
console.log(paginationModel)

const query = useQuery({queryKey: ['customers'], queryFn: getAllCustomers})
console.log(query.data)
  const rows: GridRowsProp = customersPageList.data.map((customer) => {
    return {
      ...customer,
      createdAt: new Date(customer.createdAt).toLocaleDateString("ro-RO"),
      deadline: new Date(customer.deadline).toLocaleDateString("ro-RO"),
    };
  });
const handleClick=async(e)=>{
  e.preventDefault();
const response = await fetch(customers.links.first);
const data = await response.json();
console.log(data)
setCustomersPageList(data)
}
  return (
    <>
    <button onClick={handleClick}>First page</button>
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid rows={rows} 
      columns={columns} 
      rowCount={customers.meta.totalItems}
      pagination
      paginationMode="server"
      pageSizeOptions={[2, 10, 15]}
      paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  loading={loading}   />
    </div></>
     
  );
}

export default CustomersTable;
