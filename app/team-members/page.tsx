import AddNewTeamMember from "../_components/team-members/AddNewTeamMember";
import TeamMembersTable from "../_components/team-members/TeamMembersTable";
import LinkButton from "../_components/ui/LinkButton";

function Page() {
  return (
    <div className="m-15 flex flex-col gap-3">
      <div className="flex gap-3">
        <LinkButton href="/" title="Homepage" />
        <LinkButton href="/customers" title="Customers" />
      </div>
      <AddNewTeamMember />
      <TeamMembersTable />
    </div>
  );
}
export default Page;
