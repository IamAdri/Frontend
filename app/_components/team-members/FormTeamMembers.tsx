"use client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { TeamMember } from "@/app/_interfaces/team-member";
import { FormValuesTeamMember } from "@/app/_interfaces/formValuesTeamMember";

type FormProps = {
  onClose: () => void;
  selectedRow?: TeamMember;
  onSubmit: (data: FormValuesTeamMember) => void;
  companyNames: string[];
  isSubmitting: boolean;
};

function FormTeamMembers({
  onClose,
  selectedRow,
  onSubmit,
  companyNames,
  isSubmitting,
}: FormProps) {
  const customers = selectedRow?.customers || [];
  const defaultValues = selectedRow
    ? {
        id: selectedRow.id,
        name: selectedRow.name,
        contactEmail: selectedRow.contactEmail,
        contactNumber: selectedRow.contactNumber,
        project1: customers[0]?.companyName ?? "",
        project2: customers[1]?.companyName ?? "",
      }
    : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesTeamMember>({
    defaultValues: defaultValues as FormValuesTeamMember,
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  //console.log(companyNames);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  const companyNamesOptions = companyNames.map((name) => (
    <option key={name} value={name}>
      {name}
    </option>
  ));

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-[1000] transition-all duration-500 ">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg px-16 py-12 transition-all duration-500 flex flex-col gap-3"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 cursor-pointer"
        >
          <CancelOutlinedIcon color="action" fontSize="large" />
        </button>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", { required: "This field is required" })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="contactNumber">Contact number: </label>
          <input
            type="text"
            id="contactNumber"
            placeholder="Contact number"
            {...register("contactNumber", {
              required: "This field is required",
            })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
          {errors.contactNumber && (
            <span className="text-red-500 text-xs">
              {errors.contactNumber.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="contactEmail">Contact email: </label>
          <input
            type="email"
            id="contactEmail"
            placeholder="Contact email"
            {...register("contactEmail", {
              required: "This field is required",
            })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
          {errors.contactEmail && (
            <span className="text-red-500 text-xs">
              {errors.contactEmail.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="project1">First project(company name): </label>
          <select
            id="project1"
            {...register("project1")}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="none">none</option>
            {companyNamesOptions}
          </select>
          {errors.project1 && (
            <span className="text-red-500 text-xs">
              {errors.project1.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="project2">Second project(company name): </label>
          <select
            id="project2"
            {...register("project2")}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="none">none</option>
            {companyNamesOptions}
          </select>
          {errors.project2 && (
            <span className="text-red-500 text-xs">
              {errors.project2.message}
            </span>
          )}
        </div>
        <button
          className="cursor-pointer border border-gray-500 px-3"
          type="submit"
        >
          {isSubmitting
            ? "Saving..."
            : selectedRow?.id
              ? "Edit team member"
              : "Add new team member"}
        </button>
      </form>
    </div>
  );
}

export default FormTeamMembers;
