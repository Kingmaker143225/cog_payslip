export default function EmployeeTable({ employees }) {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            {Object.keys(employees[0]).map((key) => (
              <th
                key={key}
                className="text-left px-4 py-3 border-b font-semibold text-sm"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {Object.values(employee).map((value, i) => (
                <td key={i} className="px-4 py-3 border-b text-sm">
                  {String(value ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}