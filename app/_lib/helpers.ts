import { format, parseISO } from "date-fns";
import { FormValuesTeamMember } from "../_interfaces/formValuesTeamMember";
import { ro } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";

export function formatCustomersAssociated(data: FormValuesTeamMember) {
  const { id, project1, project2, ...payloadTeamMember } = data;
  const customers = [project1, project2].filter(
    (project) => project !== "none",
  );
  return {
    ...payloadTeamMember,
    customers,
  };
}

export function formatDate(dateStr: string | undefined | null) {
  if (!dateStr) return null;
  try {
    return format(parseISO(dateStr), "dd.MM.yyyy", { locale: ro });
  } catch (error) {
    return dateStr;
  }
}
