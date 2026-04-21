import { FormValuesTeamMember } from "../_interfaces/formValuesTeamMember";
import { Paginated } from "../_interfaces/paginated";
import { TeamMember } from "../_interfaces/team-member";
import { API_URL } from "./constants";
import { formatCustomersAssociated } from "./helpers";

interface FetchParams {
  page: number;
  limit: number;
}

export async function getAllTeamMembers({
  page,
  limit,
}: FetchParams): Promise<Paginated<TeamMember>> {
  const response = await fetch(
    `${API_URL}/team-members/?limit=${limit}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Could not get team members!");
  }
  return await response.json();
}

export async function postTeamMember(
  data: FormValuesTeamMember,
): Promise<TeamMember> {
  const response = await fetch(`${API_URL}/team-members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatCustomersAssociated(data)),
  });
  if (!response.ok) {
    throw new Error("Failed to create new team member!");
  }
  return await response.json();
}

export async function updateTeamMember(
  data: FormValuesTeamMember,
): Promise<TeamMember> {
  if (!data.id) {
    throw new Error("Team member ID  is required for the update!");
  }
  const response = await fetch(`${API_URL}/team-members/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatCustomersAssociated(data)),
  });

  if (!response.ok) {
    throw new Error("Failed to update team member!");
  }

  return await response.json();
}

export async function deleteTeamMember(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/team-members/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Could not delete team member!");
  }
}

/*
export async function getAllTeamMembersNames() {
  const response = await fetch("http://localhost:3001/team-members/names");
  if (!response.ok) {
    throw new Error("Could not get team members names!");
  }
  const data = await response.json();
  return data;
}*/
