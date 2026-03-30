import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payslip Generator
        </h1>
        <p className="text-gray-600 mb-8">
          Upload Excel file, preview payroll data, and generate payslips.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/upload"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Upload Excel
          </Link>

          <Link
            href="/preview"
            className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900"
          >
            Preview Payslip
          </Link>
        </div>
      </div>
    </main>
  );
}