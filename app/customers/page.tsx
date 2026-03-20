"use client";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

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
  return (
    <div className="m-15">
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
