"use client";

import { useState } from "react";

interface RecordField {
  record_label: string;
  record_type: "type_text" | "type_date" | "type_number";
  record_value?: string;
  record_value_date?: string;
  record_value_number?: number;
}

const DynamicForm: React.FC = () => {
  const [fields, setFields] = useState<RecordField[]>([
    { record_label: "EMP ID", record_type: "type_text", record_value: "" },
    { record_label: "Full Name", record_type: "type_text", record_value: "" },
    { record_label: "Email Address", record_type: "type_text", record_value: "" },
    { record_label: "Phone Number", record_type: "type_text", record_value: "" },
    { record_label: "DOJ", record_type: "type_date", record_value_date: "" },
    { record_label: "Salary", record_type: "type_number", record_value_number: undefined },
    { record_label: "Role", record_type: "type_text", record_value: "" },
    { record_label: "Department", record_type: "type_text", record_value: "" },
  ]);

  const handleChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    const field = updatedFields[index];
    
    if (field.record_type === "type_number") {
      field.record_value_number = value ? parseFloat(value) : undefined;
    } else if (field.record_type === "type_date") {
      field.record_value_date = value;
    } else {
      field.record_value = value;
    }

    setFields(updatedFields);
  };

  const generateJSON = () => {
    const featureData = { record_data: fields };
    const wildSearch = fields.map(f => f.record_value || f.record_value_date || f.record_value_number).join(" ");
    
    const jsonData = {
      total_results: 1,
      data: [
        {
          record_id: "emp_rec_005",
          feature_name: "emp",
          added_by: "flex_admin",
          record_status: "active",
          created_on_date: new Date().toISOString().split("T")[0],
          feature_data: featureData,
          more_data: { wild_search: wildSearch },
          doc_position: 0,
        },
      ],
    };
    
    console.log(jsonData);
    alert("JSON generated! Check console.");
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-[var(--input-bg)] text-[var(--text-color)]">
      <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">Dynamic Employee Form</h2>
      {fields.map((field, index) => (
        <div key={index} className="mb-3">
          <label className="block text-sm font-medium text-[var(--text-color)]">{field.record_label}</label>
          <input
            type={field.record_type === "type_date" ? "date" : field.record_type === "type_number" ? "number" : "text"}
            value={(field.record_value || field.record_value_date || field.record_value_number?.toString()) ?? ""}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full p-2 border rounded bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--border-color)]"
          />
        </div>
      ))}
      <button className="mt-4 w-full p-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded hover:bg-[var(--button-hover)]" onClick={generateJSON}>Generate JSON</button>
    </div>
  );
};

export default DynamicForm;
