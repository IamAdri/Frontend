import AddNewCustomer from "../_components/customers/AddNewCustomer";
import CustomersTable from "../_components/customers/CustomersTable";
import LinkButton from "../_components/ui/LinkButton";

function Page() {
  return (
    <div className="m-15 flex flex-col gap-3">
      <div className="flex gap-3">
        <LinkButton href="/" title="Homepage" />
        <LinkButton href="/team-members" title="Team Members" />
      </div>

      <AddNewCustomer />
      <CustomersTable />
    </div>
  );
}

export default Page;
