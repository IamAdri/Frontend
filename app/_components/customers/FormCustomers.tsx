"use client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Customer } from "@/app/_interfaces/customer";
import { FormValuesCustomer } from "@/app/_interfaces/formValuesCustomer";

type FormProps = {
  onClose: () => void;
  selectedRow?: Customer | null;
  onSubmit: (data: FormValuesCustomer) => void;
  isSubmitting?: boolean;
};

function FormCustomers({
  onClose,
  selectedRow,
  onSubmit,
  isSubmitting,
}: FormProps) {
  const defaultValues = selectedRow
    ? {
        id: selectedRow.id,
        companyName: selectedRow.companyName,
        contactName: selectedRow.contactName,
        contactEmail: selectedRow.contactEmail,
        industry: selectedRow.industry,
        projectType: selectedRow.projectType,
        status: selectedRow.status,
        deadline: selectedRow.deadline,
      }
    : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesCustomer>({
    defaultValues: defaultValues as FormValuesCustomer,
  });

  //Side effect when clicking outside the form
  const formRef = useRef<HTMLFormElement | null>(null);

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
          <label htmlFor="companyName">Company name: </label>
          <input
            type="text"
            id="companyName"
            placeholder="Company name"
            {...register("companyName", { required: "This field is required" })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
          {errors.companyName && (
            <span className="text-red-500 text-xs">
              {errors.companyName.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="contactName">Contact name: </label>
          <input
            type="text"
            id="contactName"
            placeholder="Contact name"
            {...register("contactName", { required: "This field is required" })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
          {errors.contactName && (
            <span className="text-red-500 text-xs">
              {errors.contactName.message}
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
          <label htmlFor="industry">Industry: </label>
          <input
            type="text"
            id="industry"
            placeholder="Industry"
            {...register("industry", { required: "This field is required" })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
          {errors.industry && (
            <span className="text-red-500 text-xs">
              {errors.industry.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="projectType">Project type: </label>
          <select
            id="projectType"
            {...register("projectType", { required: "This field is required" })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="crm">CRM</option>
            <option value="web_platform">Web platform</option>
            <option value="erp">ERP</option>
          </select>
          {errors.projectType && (
            <span className="text-red-500 text-xs">
              {errors.projectType.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="status">Status: </label>
          <select
            id="status"
            {...register("status", { required: "This field is required" })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          >
            <option value="scheduled">Scheduled</option>
            <option value="in_process">In process</option>
            <option value="test">Test</option>
            <option value="finished">Finished</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-xs">
              {errors.status.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="deadline">Deadline: </label>
          <input
            type="date"
            id="deadline"
            {...register("deadline", { required: "This field is required" })}
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
          {errors.deadline && (
            <span className="text-red-500 text-xs">
              {errors.deadline.message}
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
              ? "Update Customer"
              : "Create Customer"}
        </button>
      </form>
    </div>
  );
}

export default FormCustomers;
/**
 *  <div>
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
 */

/**
 *
 */
