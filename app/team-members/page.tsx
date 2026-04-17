import AddNewTeamMember from "../_components/team-members/AddNewTeamMember";
import TeamMembersTable from "../_components/team-members/TeamMembersTable";

function Page() {
  return (
    <div className="m-15 flex flex-col gap-3">
      <AddNewTeamMember />
      <TeamMembersTable />
    </div>
  );
}
export default Page;
