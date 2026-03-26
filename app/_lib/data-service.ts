import { Customer } from "../_interfaces/customer";
import { Paginated } from "../_interfaces/paginated";

export async function getAllCustomers({page, limit}:{page:number, limit:number}): Promise<Paginated<Customer>> {
    const response = await fetch(`http://localhost:3001/customers/?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error("Could not get customers!");
    }
    const data: Paginated<Customer> = await response.json();
  
    return data;
  
}