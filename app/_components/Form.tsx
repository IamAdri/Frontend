"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../_interfaces/formValues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Customer } from "../_interfaces/customer";

type FormProps = {
  openForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCustomer?: Customer;
  mutationFunction: any;
};

function Form({ openForm, selectedCustomer, mutationFunction }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const formRef = useRef<HTMLFormElement | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, FormValues>({
    mutationFn: (data) => mutationFunction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!formRef.current) return;
      if (!formRef.current.contains(e.target as Node)) {
        reset();
        openForm(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleSubmitForm = async (data: FormValues) => {
    console.log(data);
    mutation.mutate(data);
    reset();
    openForm(false);
  };

  const handleCloseForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    openForm(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-[1000] transition-all duration-500 ">
      <form
        ref={formRef}
        onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg px-16 py-12 transition-all duration-500 flex flex-col gap-3"
      >
        <button
          type="button"
          onClick={handleCloseForm}
          className="absolute top-0 right-0 cursor-pointer"
        >
          <CancelOutlinedIcon color="action" fontSize="large" />
        </button>
        <div>
          <label htmlFor="companyName">Company name: </label>
          <input
            type="text"
            id="companyName"
            defaultValue={selectedCustomer?.companyName || ""}
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
            defaultValue={selectedCustomer?.contactName || ""}
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
            defaultValue={selectedCustomer?.contactEmail || ""}
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
            defaultValue={selectedCustomer?.industry || ""}
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
            defaultValue={selectedCustomer?.projectType || ""}
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
            defaultValue={selectedCustomer?.status || ""}
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
            defaultValue={selectedCustomer?.deadline}
            {...register("deadline")}
            required
            className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
          />
        </div>
        <div>
          <input
            type="hidden"
            value={selectedCustomer?.id}
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

export default Form;
