"use client";

import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { validateSelectedMonthAgainstExcel } from "../lib/monthValidation";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [isValidated, setIsValidated] = useState(false);

  const clearSavedData = () => {
    localStorage.removeItem("employees");
    localStorage.removeItem("payrollMonth");
    localStorage.removeItem("payrollYear");
    localStorage.removeItem("payrollValidated");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an Excel file.");
      setSuccess("");
      setEmployees([]);
      setIsValidated(false);
      clearSavedData();
      return;
    }

    if (!selectedMonth || !selectedYear) {
      setError("Please select month and year.");
      setSuccess("");
      setEmployees([]);
      setIsValidated(false);
      clearSavedData();
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setEmployees([]);
    setIsValidated(false);
    clearSavedData();

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-excel", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      const parsedRows = data.rows || [];

      const validation = validateSelectedMonthAgainstExcel(
        parsedRows,
        selectedMonth,
        selectedYear
      );

      if (!validation.valid) {
        throw new Error(validation.message);
      }

      setEmployees(parsedRows);
      setIsValidated(true);
      setSuccess(validation.message);

      localStorage.setItem("employees", JSON.stringify(parsedRows));
      localStorage.setItem("payrollMonth", selectedMonth);
      localStorage.setItem("payrollYear", selectedYear);
      localStorage.setItem("payrollValidated", "true");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSuccess("");
      setEmployees([]);
      setIsValidated(false);
      clearSavedData();
    } finally {
      setLoading(false);
    }
  };

  const handleViewPayslips = () => {
    const validated = localStorage.getItem("payrollValidated");

    if (!isValidated || validated !== "true" || employees.length === 0) {
      setError("Please upload and validate the correct Excel month first.");
      return;
    }

    window.location.href = "/preview";
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block w-full border rounded-lg p-3"
          >
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Year</label>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            placeholder="Enter year"
            className="block w-full border rounded-lg p-3"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Upload Excel File</label>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setEmployees([]);
            setIsValidated(false);
            setError("");
            setSuccess("");
            clearSavedData();
          }}
          className="block w-full border rounded-lg p-3"
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Upload & Validate"}
        </button>

        {isValidated && employees.length > 0 && (
          <button
            onClick={handleViewPayslips}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            View Payslips
          </button>
        )}
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}

      {employees.length > 0 && isValidated && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Validated Employees</h2>
          <EmployeeTable employees={employees} />
        </div>
      )}
    </div>
  );
}