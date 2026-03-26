"use client"
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { FormValues } from "../_interfaces/formValues";


function AddNewCustomer(){
    const [showForm, setShowForm] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const formRef = useRef<HTMLFormElement | null>(null);
    useEffect(()=>{
        function handleClick(e : MouseEvent){
            if(!formRef.current) return;
            if(!formRef.current.contains(e.target as Node)) {
                setShowForm(false)
            }
        }
        document.addEventListener('click', handleClick);
        return ()=>{
            document.removeEventListener('click', handleClick)
        }
    })

    const handleOpenForm = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowForm(true)
    }
    const handleSubmitForm=async (data: FormValues)=>{
        console.log(data);
         const response = await fetch("http://localhost:3001/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: data.companyName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        industry: data.industry,
        projectType: data.projectType,
        status: data.status,
        deadline: data.deadline,
      }),
    });
    const postedCustomer = await response.json();
    
        reset();
        setShowForm(false)
    }

    const handleCloseForm= (e : React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setShowForm(false)
        
    }
    
    return <>
    <button onClick={handleOpenForm} className="relative self-end border px-5 py-1">Add</button>
   {showForm && <div className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-[1000] transition-all duration-500 ">
        <form ref={formRef} onSubmit={handleSubmit((data)=>handleSubmitForm(data))} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg px-16 py-12 transition-all duration-500 flex flex-col gap-3">
            <button type="button" onClick={handleCloseForm} className="absolute top-0 right-0 cursor-pointer"><CancelOutlinedIcon color="action" fontSize="large" /></button>
            <div>
                <label htmlFor="companyName">Company name: </label>
                <input
                    type="text"
                    id="companyName"
                    placeholder="Company name"
                    {...register('companyName')}
                    required
                    className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
                />
            </div>
                <div>
                    <label htmlFor="contactName">Contact name: </label>
                    <input
                    type="text"
                    id="contactName"
                    placeholder="Contact name"
                    {...register('contactName')}
                    required
                    className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
                    />
                </div>
             <div>
                <label htmlFor="contactEmail">Contact email: </label>
                <input
                type="email"
                id="contactEmail"
                placeholder="Contact email"
                {...register('contactEmail')}
                required
                className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
                />
             </div>
             <div>
                <label htmlFor="industry">Industry: </label>
                <input
                type="text"
                id="industry"
                placeholder="Industry"
                {...register('industry')}
                required
                className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
                />
             </div>
             
             <div>
                <label htmlFor="projectType">Project type: </label>
                <select id="projectType"
                {...register('projectType')}
                required
                className="border border-gray-500 px-3 rounded-sm focus:text-gray-900">
                    <option value="crm">CRM</option>
                    <option value="web_platform">Web platform</option>
                    <option value="erp">ERP</option>
                </select>
               
              
             </div>
            <div>
                <label htmlFor="status">Status: </label>
                <select
                id="status"
                {...register('status')}
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
                {...register('deadline')}
                required
                className="border border-gray-500 px-3 rounded-sm focus:text-gray-900"
                />
             </div>
            <input className="cursor-pointer border border-gray-500 px-3" type="submit"></input>
        </form>
    </div>}
    </> 
}

export default AddNewCustomer;

/* companyName: "SunSRL",
        contactName: "Mirela Ceban",
        contactEmail: "sun@gmail.com",
        industry: "e-commerce",
        projectType: "web_platform",
        status: "scheduled",
        deadline: "2026-03-23T10:30:00Z",*/