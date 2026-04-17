"use client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { TeamMember } from "@/app/_interfaces/team-member";
import { FormValuesTeamMember } from "@/app/_interfaces/formValuesTeamMember";

type FormProps = {
  closeEditForm: () => void;
  selectedRow?: TeamMember;
  submitEditedRow: (data: FormValuesTeamMember) => void;
};

function FormTeamMembers({
  closeEditForm,
  selectedRow,
  submitEditedRow,
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesTeamMember>();

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
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            defaultValue={selectedRow?.name || ""}
            placeholder="Name"
            {...register("name")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="contactName">Contact number: </label>
          <input
            type="text"
            id="contactNumber"
            defaultValue={selectedRow?.contactNumber || ""}
            placeholder="Contact number"
            {...register("contactNumber")}
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

export default FormTeamMembers;
