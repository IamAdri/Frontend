import AddNewCustomer from "../_components/AddNewCustomer";
import CustomersTable from "../_components/CustomersTable";

 function Page() {
  return (
    <div className="m-15 flex flex-col gap-3">
      <AddNewCustomer />
      <CustomersTable />
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
