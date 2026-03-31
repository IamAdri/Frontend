"use client";
import React, { useState } from "react";
import Form from "./Form";
import { postCustomer } from "../_lib/data-service";

function AddNewCustomer() {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowForm(true);
  };

  return (
    <>
      <button
        onClick={handleOpenForm}
        className="self-end border px-5 py-1 cursor-pointer"
      >
        Add
      </button>
      {showForm && (
        <Form openForm={setShowForm} mutationFunction={postCustomer} />
      )}
    </>
  );
}

export default AddNewCustomer;
