import CustomersTable from "../_components/CustomersTable";
import { Customer } from "../_interfaces/customers";

async function getAllCustomers(): Promise<Customer[]> {
  try {
    const response = await fetch("http://localhost:3001/customers", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not get customers!");
    }
    const data: Customer[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function Page() {
  const customers = await getAllCustomers();
  console.log(customers);
  return (
    <div className="m-15">
      <CustomersTable customers={customers} />
    </div>
  );
}

export default Page;

/*const handleCreateCustomer = async (
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
  const handleGetAllCustomers = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/customers");
    const data = await response.json();
    console.log(data);
  };*/
