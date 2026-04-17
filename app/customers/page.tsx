import AddNewCustomer from "../_components/customers/AddNewCustomer";
import CustomersTable from "../_components/customers/CustomersTable";

function Page() {
  return (
    <div className="m-15 flex flex-col gap-3">
      <AddNewCustomer />
      <CustomersTable />
    </div>
  );
}

export default Page;
