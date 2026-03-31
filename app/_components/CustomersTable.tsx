"use client";

import { updateCustomer } from "../_lib/data-service";
import { Customer } from "../_interfaces/customer";
import Form from "./Form";
import GridColumnsAndRows from "./GridColumnsAndRows";
import { useState } from "react";

function CustomersTable() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  return (
    <>
      <GridColumnsAndRows
        handleShowEditForm={setShowEditForm}
        handleSelectedCustomer={setSelectedCustomer}
      />
      {showEditForm && selectedCustomer && (
        <Form
          openForm={setShowEditForm}
          mutationFunction={updateCustomer}
          selectedCustomer={selectedCustomer}
        />
      )}
    </>
  );
}

export default CustomersTable;
