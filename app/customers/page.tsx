"use client";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React from "react";

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
];

const columns: GridColDef[] = [
  { field: "company_name", headerName: "Company Name", width: 200 },
  { field: "contact_name", headerName: "Contact Name", width: 200 },
  { field: "contact_email", headerName: "Contact Email", width: 200 },
  { field: "industry", headerName: "Industry", width: 200 },
  { field: "project_type", headerName: "Project Type", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
  { field: "created_at", headerName: "Created At", width: 200 },
  { field: "deadline", headerName: "Deadline", width: 200 },
];

export default function RenderComponent() {
  const handleCreateCustomer = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: "SunSRL",
        contactName: "Mirela Ceban",
        contactEmail: "sun@gmail.com",
        industry: "e-commerce",
        projectType: "web_platform",
        status: "scheduled",
        deadline: "2026-03-23T10:30:00Z",
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="m-15">
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      <button
        className="mt-15 border-solid border-1 cursor-pointer"
        onClick={handleCreateCustomer}
      >
        Post new customer
      </button>
    </div>
  );
}
