"use client";

import FileUpload from "../../components/FileUpload";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Payroll Excel</h1>
        <FileUpload />
      </div>
    </main>
  );
}