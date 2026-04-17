"use client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Customer } from "@/app/_interfaces/customer";
import { FormValuesCustomer } from "@/app/_interfaces/formValuesCustomer";
import { useQuery } from "@tanstack/react-query";
import { getAllTeamMembersNames } from "@/app/_lib/data-service-team-members";

type FormProps = {
  closeEditForm: () => void;
  selectedRow?: Customer;
  submitEditedRow: (data: FormValuesCustomer) => void;
};

function FormCustomers({
  closeEditForm,
  selectedRow,
  submitEditedRow,
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesCustomer>();

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!formRef.current) return;
      if (!formRef.current.contains(e.target as Node)) {
        closeEditForm();
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const {
    isLoading,
    isFetching,
    data: teamMembersNames,
    error,
  } = useQuery({
    queryKey: ["team-members-names"],
    queryFn: getAllTeamMembersNames,
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-[1000] transition-all duration-500 ">
      <form
        ref={formRef}
        onSubmit={handleSubmit((data) => submitEditedRow(data))}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg px-16 py-12 transition-all duration-500 flex flex-col gap-3"
      >
        <button
          type="button"
          onClick={closeEditForm}
          className="absolute top-0 right-0 cursor-pointer"
        >
          <CancelOutlinedIcon color="action" fontSize="large" />
        </button>
        <div>
          <label htmlFor="companyName">Company name: </label>
          <input
            type="text"
            id="companyName"
            defaultValue={selectedRow?.companyName || ""}
            placeholder="Company name"
            {...register("companyName")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="contactName">Contact name: </label>
          <input
            type="text"
            id="contactName"
            defaultValue={selectedRow?.contactName || ""}
            placeholder="Contact name"
            {...register("contactName")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="contactEmail">Contact email: </label>
          <input
            type="email"
            id="contactEmail"
            defaultValue={selectedRow?.contactEmail || ""}
            placeholder="Contact email"
            {...register("contactEmail")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="industry">Industry: </label>
          <input
            type="text"
            id="industry"
            defaultValue={selectedRow?.industry || ""}
            placeholder="Industry"
            {...register("industry")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="projectType">Project type: </label>
          <select
            id="projectType"
            {...register("projectType")}
            defaultValue={selectedRow?.projectType || ""}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="crm">CRM</option>
            <option value="web_platform">Web platform</option>
            <option value="erp">ERP</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Status: </label>
          <select
            id="status"
            defaultValue={selectedRow?.status || ""}
            {...register("status")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="scheduled">Scheduled</option>
            <option value="in_process">In process</option>
            <option value="test">Test</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div>
          <label htmlFor="deadline">Deadline: </label>
          <input
            type="date"
            id="deadline"
            defaultValue={selectedRow?.deadline}
            {...register("deadline")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="teamMember1">First team member: </label>
          <select
            id="teamMember1"
            defaultValue={selectedRow?.teamMembers[0]}
            {...register("teamMember1")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="none">none</option>
            {teamMembersNames?.length > 0 &&
              teamMembersNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="teamMember2">Second team member: </label>
          <select
            id="teamMember2"
            defaultValue={selectedRow?.teamMembers[1]}
            {...register("teamMember2")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="none">none</option>
            {teamMembersNames?.length > 0 &&
              teamMembersNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <input
            type="hidden"
            value={selectedRow?.id}
            {...register("id")}
            required
          />
        </div>
        <input
          className="cursor-pointer border border-gray-500 px-3"
          type="submit"
        ></input>
      </form>
    </div>
  );
}

export default FormCustomers;
