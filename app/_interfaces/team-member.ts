export interface TeamMember {
  id: number;
  name: string;
  contactNumber: string;
  contactEmail: string;
  customers?: { id: number; companyName: string }[];
}
