import { Customer } from "../_interfaces/customer";
import { FormValuesCustomer } from "../_interfaces/formValuesCustomer";
import { Paginated } from "../_interfaces/paginated";

export async function getAllCustomers({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<Paginated<Customer>> {
  const response = await fetch(
    `http://localhost:3001/customers/?limit=${limit}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Could not get customers!");
  }
  const data: Paginated<Customer> = await response.json();

  return data;
}

export async function postCustomer(data: FormValuesCustomer) {
  const teamMember1 = data.teamMember1 === "none" ? "" : data.teamMember1;
  const teamMember2 = data.teamMember2 === "none" ? "" : data.teamMember2;
  const teamMembers = [];
  if (teamMember1 !== "") teamMembers.push(teamMember1);
  if (teamMember2 !== "") teamMembers.push(teamMember2);
  const response = await fetch("http://localhost:3001/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyName: data.companyName,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      industry: data.industry,
      projectType: data.projectType,
      status: data.status,
      deadline: data.deadline,
      teamMembers: teamMembers,
    }),
  });
  const postedCustomer = await response.json();
}

export async function updateCustomer(data: FormValuesCustomer) {
  const teamMembers = [data.teamMember1, data.teamMember2];
  const response = await fetch(`http://localhost:3001/customers/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyName: data.companyName,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      industry: data.industry,
      projectType: data.projectType,
      status: data.status,
      deadline: data.deadline,
      teamMembers: teamMembers,
    }),
  });
  const postedCustomer = await response.json();
}

export async function deleteCustomer(id: number) {
  const response = await fetch(`http://localhost:3001/customers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Could not delete customer!");
  }
  // await response.json();
}
