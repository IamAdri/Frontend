import { Customer } from "../_interfaces/customer";
import { FormValuesCustomer } from "../_interfaces/formValuesCustomer";
import { Paginated } from "../_interfaces/paginated";
import { API_URL } from "./constants";

interface FetchParams {
  page: number;
  limit: number;
}

export async function getAllCustomers({
  page,
  limit,
}: FetchParams): Promise<Paginated<Customer>> {
  const response = await fetch(
    `${API_URL}/customers/?limit=${limit}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Could not get customers!");
  }
  return await response.json();
}

export async function getAllCompanyNames(): Promise<string[]> {
  const response = await fetch(`${API_URL}/customers/names`);
  if (!response.ok) {
    throw new Error("Could not get company names.");
  }
  const data: { id: number; companyName: string }[] = await response.json();

  return data.map((d) => d.companyName);
}

export async function postCustomer(
  data: FormValuesCustomer,
): Promise<Customer> {
  const { id, ...customerPayload } = data;
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerPayload),
  });

  if (!response.ok) {
    throw new Error("Failed to post customer");
  }
  return response.json();
}

export async function updateCustomer(
  data: FormValuesCustomer,
): Promise<Customer> {
  const { id, ...customerPayload } = data;
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerPayload),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  return response.json();
}

export async function deleteCustomer(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Could not delete customer!");
  }
}
