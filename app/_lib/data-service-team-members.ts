import { FormValuesTeamMember } from "../_interfaces/formValuesTeamMember";
import { Paginated } from "../_interfaces/paginated";
import { TeamMember } from "../_interfaces/team-member";

export async function getAllTeamMembers({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<Paginated<TeamMember>> {
  const response = await fetch(
    `http://localhost:3001/team-members/?limit=${limit}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Could not get team members!");
  }
  const data: Paginated<TeamMember> = await response.json();

  return data;
}

export async function getAllTeamMembersNames() {
  const response = await fetch("http://localhost:3001/team-members/names");
  if (!response.ok) {
    throw new Error("Could not get team members names!");
  }
  const data = await response.json();
  return data;
}

export async function postTeamMember(data: FormValuesTeamMember) {
  const response = await fetch("http://localhost:3001/team-members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      contactNumber: data.contactNumber,
      contactEmail: data.contactEmail,
    }),
  });
  const postedTeamMember = await response.json();
}

export async function deleteTeamMember(id: number) {
  const response = await fetch(`http://localhost:3001/team-members/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Could not delete team member!");
  }
  // await response.json();
}

export async function updateTeamMember(data: FormValuesTeamMember) {
  const response = await fetch(
    `http://localhost:3001/team-members/${data.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        contactNumber: data.contactNumber,
        contactEmail: data.contactEmail,
      }),
    },
  );
  const postedTeamMember = await response.json();
}

/*{
    "name": "Adriana Mircea",
    "contactNumber": "0777777777",
    "contactEmail":"adriana@gmail.com"
}*/
