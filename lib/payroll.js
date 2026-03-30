// export function buildPayslipData(row) {
//   const basic = Number(row.Basic || 0);
//   const hra = Number(row.HRA || 0);
//   const conveyance = Number(row.Conveyance || 0);
//   const medical = Number(row.Medical || 0);
//   const other = Number(row.Other || 0);

//   const pf = Number(row.PF || 0);
//   const esi = Number(row.ESI || 0);
//   const ptax = Number(row.PTAX || 0);
//   const tds = Number(row.TDS || 0);

//   const totalEarnings = basic + hra + conveyance + medical + other;
//   const totalDeductions = pf + esi + ptax + tds;
//   const netPay = totalEarnings - totalDeductions;

//   return {
//     employeeId: row["Employee ID"] || "",
//     employeeName: row["Employee Name"] || "",
//     designation: row["Designation"] || "",
//     location: row["Location"] || "",
//     doj: row["DOJ"] || "",
//     department: row["Department"] || "",
//     bankAccount: row["Bank A/C No"] || "",
//     ifsc: row["IFSC Code"] || "",
//     pan: row["PAN"] || "",
//     paidDays: Number(row["Paid Days"] || 0),
//     payMonth: row["Pay Month"] || "",
//     earnings: [
//       { label: "Basic", amount: basic },
//       { label: "HRA", amount: hra },
//       { label: "Conveyance", amount: conveyance },
//       { label: "Medical", amount: medical },
//       { label: "Other", amount: other },
//     ],
//     deductions: [
//       { label: "PF", amount: pf },
//       { label: "ESI", amount: esi },
//       { label: "PTAX", amount: ptax },
//       { label: "TDS", amount: tds },
//     ],
//     totalEarnings,
//     totalDeductions,
//     netPay,
//   };
// }



// export function buildPayslipData(row, index = 1) {
//   const basic = Number(row.Basic || 0);
//   const hra = Number(row.HRA || 0);
//   const conveyance = Number(row.Conveyance || 0);
//   const medical = Number(row.Medical || 0);
//   const special = Number(row["Special Allowance"] || 0);

//   const pf = Number(row.PF || 0);
//   const esi = Number(row.ESI || 0);
//   const tds = Number(row.TDS || 0);

//   const totalEarnings =
//     basic + hra + conveyance + medical + special;

//   const totalDeductions = pf + esi + tds;

//   const netPay = totalEarnings - totalDeductions;

//   return {
//     employeeId: `EMP${index}`,
//     employeeName: row.Name || `Employee ${index}`,
//     designation: row.DESIGNATION || "Employee",
//     location: "Hyderabad",
//     doj: "2020-01-01",
//     department: "General",
//     bankAccount: "XXXXXXX",
//     ifsc: "XXXX000",
//     pan: "ABCDE1234F",
//     paidDays: 30,
//     payMonth: "Jan 2026",

//     earnings: [
//       { label: "Basic", amount: basic },
//       { label: "HRA", amount: hra },
//       { label: "Conveyance", amount: conveyance },
//       { label: "Medical", amount: medical },
//       { label: "Special Allowance", amount: special },
//     ],

//     deductions: [
//       { label: "PF", amount: pf },
//       { label: "ESI", amount: esi },
//       { label: "TDS", amount: tds },
//     ],

//     totalEarnings,
//     totalDeductions,
//     netPay,
//   };
// }





export function buildPayslipData(row, index = 1, payMonth = "January", payYear = "2026") {
  const basic = Number(row.Basic || 0);
  const hra = Number(row.HRA || 0);
  const conveyance = Number(row.Conveyance || 0);
  const medical = Number(row.Medical || 0);
  const special = Number(row["Special Allowance"] || 0);

  const pf = Number(row.PF || 0);
  const esi = Number(row.ESI || 0);
  const tds = Number(row.TDS || 0);

  const totalEarnings = basic + hra + conveyance + medical + special;
  const totalDeductions = pf + esi + tds;
  const netPay = totalEarnings - totalDeductions;

  return {
    employeeId: `EMP${index}`,
    employeeName: row.Name || row["Employee Name"] || `Employee ${index}`,
    designation: row.DESIGNATION || row.Designation || "Employee",
    location: row.Location || "Hyderabad",
    doj: row.DOJ || "2020-01-01",
    department: row.Department || "General",
    bankAccount: row["Bank A/C No"] || "XXXXXXX",
    ifsc: row["IFSC Code"] || "XXXX000",
    pan: row.PAN || "ABCDE1234F",
    paidDays: Number(row["Paid Days"] || 30),
    payMonth: `${payMonth} ${payYear}`,

    earnings: [
      { label: "Basic", amount: basic },
      { label: "HRA", amount: hra },
      { label: "Conveyance", amount: conveyance },
      { label: "Medical", amount: medical },
      { label: "Special Allowance", amount: special },
    ],

    deductions: [
      { label: "PF", amount: pf },
      { label: "ESI", amount: esi },
      { label: "TDS", amount: tds },
    ],

    totalEarnings,
    totalDeductions,
    netPay,
  };
}