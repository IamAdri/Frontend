"use client";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Customer } from "../_interfaces/customers";
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
  customers: Customer[]; // array de Customer
}

function CustomersTable({ customers }: CustomersTableProps) {
  console.log(customers);

  const rows: GridRowsProp = customers.map((customer) => {
    return {
      ...customer,
      createdAt: new Date(customer.createdAt).toLocaleDateString("ro-RO"),
      deadline: new Date(customer.deadline).toLocaleDateString("ro-RO"),
    };
  });

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default CustomersTable;
