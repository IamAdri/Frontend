import { Customer } from "../_interfaces/customer";
import { FormValues } from "../_interfaces/formValues";
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

export async function postCustomer(data: FormValues) {
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
    }),
  });
  const postedCustomer = await response.json();
}

export async function updateCustomer(data: FormValues) {
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
