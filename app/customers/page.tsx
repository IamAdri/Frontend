import CustomersTable from "../_components/CustomersTable";
import { Customer } from "../_interfaces/customer";
import { Paginated } from "../_interfaces/paginated";

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
