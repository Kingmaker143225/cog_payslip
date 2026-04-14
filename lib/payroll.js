// // export function buildPayslipData(row) {
// //   const basic = Number(row.Basic || 0);
// //   const hra = Number(row.HRA || 0);
// //   const conveyance = Number(row.Conveyance || 0);
// //   const medical = Number(row.Medical || 0);
// //   const other = Number(row.Other || 0);

// //   const pf = Number(row.PF || 0);
// //   const esi = Number(row.ESI || 0);
// //   const ptax = Number(row.PTAX || 0);
// //   const tds = Number(row.TDS || 0);

// //   const totalEarnings = basic + hra + conveyance + medical + other;
// //   const totalDeductions = pf + esi + ptax + tds;
// //   const netPay = totalEarnings - totalDeductions;

// //   return {
// //     employeeId: row["Employee ID"] || "",
// //     employeeName: row["Employee Name"] || "",
// //     designation: row["Designation"] || "",
// //     location: row["Location"] || "",
// //     doj: row["DOJ"] || "",
// //     department: row["Department"] || "",
// //     bankAccount: row["Bank A/C No"] || "",
// //     ifsc: row["IFSC Code"] || "",
// //     pan: row["PAN"] || "",
// //     paidDays: Number(row["Paid Days"] || 0),
// //     payMonth: row["Pay Month"] || "",
// //     earnings: [
// //       { label: "Basic", amount: basic },
// //       { label: "HRA", amount: hra },
// //       { label: "Conveyance", amount: conveyance },
// //       { label: "Medical", amount: medical },
// //       { label: "Other", amount: other },
// //     ],
// //     deductions: [
// //       { label: "PF", amount: pf },
// //       { label: "ESI", amount: esi },
// //       { label: "PTAX", amount: ptax },
// //       { label: "TDS", amount: tds },
// //     ],
// //     totalEarnings,
// //     totalDeductions,
// //     netPay,
// //   };
// // }



// // export function buildPayslipData(row, index = 1) {
// //   const basic = Number(row.Basic || 0);
// //   const hra = Number(row.HRA || 0);
// //   const conveyance = Number(row.Conveyance || 0);
// //   const medical = Number(row.Medical || 0);
// //   const special = Number(row["Special Allowance"] || 0);

// //   const pf = Number(row.PF || 0);
// //   const esi = Number(row.ESI || 0);
// //   const tds = Number(row.TDS || 0);

// //   const totalEarnings =
// //     basic + hra + conveyance + medical + special;

// //   const totalDeductions = pf + esi + tds;

// //   const netPay = totalEarnings - totalDeductions;

// //   return {
// //     employeeId: `EMP${index}`,
// //     employeeName: row.Name || `Employee ${index}`,
// //     designation: row.DESIGNATION || "Employee",
// //     location: "Hyderabad",
// //     doj: "2020-01-01",
// //     department: "General",
// //     bankAccount: "XXXXXXX",
// //     ifsc: "XXXX000",
// //     pan: "ABCDE1234F",
// //     paidDays: 30,
// //     payMonth: "Jan 2026",

// //     earnings: [
// //       { label: "Basic", amount: basic },
// //       { label: "HRA", amount: hra },
// //       { label: "Conveyance", amount: conveyance },
// //       { label: "Medical", amount: medical },
// //       { label: "Special Allowance", amount: special },
// //     ],

// //     deductions: [
// //       { label: "PF", amount: pf },
// //       { label: "ESI", amount: esi },
// //       { label: "TDS", amount: tds },
// //     ],

// //     totalEarnings,
// //     totalDeductions,
// //     netPay,
// //   };
// // }





// export function buildPayslipData(row, index = 1, payMonth = "January", payYear = "2026") {
//   const basic = Number(row.Basic || 0);
//   const hra = Number(row.HRA || 0);
//   const conveyance = Number(row.Conveyance || 0);
//   const medical = Number(row.Medical || 0);
//   const special = Number(row["Special Allowance"] || 0);

//   const pf = Number(row.PF || 0);
//   const esi = Number(row.ESI || 0);
//   const tds = Number(row.TDS || 0);

//   const totalEarnings = basic + hra + conveyance + medical + special;
//   const totalDeductions = pf + esi + tds;
//   const netPay = totalEarnings - totalDeductions;

//   return {
//     employeeId: `EMP${index}`,
//     employeeName: row.Name || row["Employee Name"] || `Employee ${index}`,
//     designation: row.DESIGNATION || row.Designation || "Employee",
//     location: row.Location || "Hyderabad",
//     doj: row.DOJ || "2020-01-01",
//     department: row.Department || "General",
//     bankAccount: row["Bank A/C No"] || "XXXXXXX",
//     ifsc: row["IFSC Code"] || "XXXX000",
//     pan: row.PAN || "ABCDE1234F",
//     paidDays: Number(row["Paid Days"] || 30),
//     payMonth: `${payMonth} ${payYear}`,

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









export function numberToWords(num) {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function inWords(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );

    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  }

  if (!num || Number(num) === 0) return "Zero Only";
  return `${inWords(Math.round(Number(num)))} Only`;
}

export function buildPayslipData(row, index = 1, payMonth = "January", payYear = "2026") {
  const basic = Number(row.Basic || row.BASIC || 0);
  const hra = Number(row.HRA || 0);
  const conveyance = Number(row.Conveyance || row.CONVEYANCE || 0);
  const medical = Number(row.Medical || row.MEDICAL || 0);
  const special =
    Number(row["Special Allowance"] || row["OTHER ALLOWANCE"] || row.Other || 0);

  const pf = Number(row.PF || 0);
  const esi = Number(row.ESI || 0);
  const ptax = Number(row["PROF TAX"] || row.PTAX || 0);
  const tds = Number(row.TDS || 0);
  const lop = Number(row.LOP || 0);

  const totalEarnings =
    Number(row.GROSS || row["Total Earnings"] || basic + hra + conveyance + medical + special);

  const totalDeductions =
    Number(row["TOTAL DEDUCTIONS"] || row["Total Deductions"] || pf + esi + ptax + tds);

  const netPay =
    Number(row["NET PAY"] || row["Net Pay"] || totalEarnings - totalDeductions);

  return {
    companyName: "CognisysAI",
    companyAddress: "2nd Floor, Tech Park, Madhapur, Hyderabad - 500081",

    employeeId:
      row["Employee No"] ||
      row["Employee ID"] ||
      row["EMPLOYEE NO"] ||
      `EMP${index}`,

    employeeName:
      row.Name ||
      row["Employee Name"] ||
      row["EMPLOYEE NAME"] ||
      `Employee ${index}`,

    designation:
      row.DESIGNATION ||
      row.Designation ||
      "Employee",

    location:
      row.Location ||
      "Hyderabad",

    doj:
      row["Joining Date"] ||
      row.DOJ ||
      "2020-01-01",

    department:
      row.Department ||
      row.DEPARTMENT ||
      "General",

    bankName:
      row["Bank Name"] ||
      row["BANK NAME"] ||
      "N/A",

    bankAccount:
      row["Bank Account No"] ||
      row["Bank A/C No"] ||
      row["BANK ACCOUNT NO"] ||
      "N/A",

    ifsc:
      row["IFSC Code"] ||
      row.IFSC ||
      "N/A",

    pan:
      row["PAN Number"] ||
      row.PAN ||
      "N/A",

    pfNo:
      row["PF No"] ||
      row["PF Number"] ||
      "N/A",

    pfUan:
      row["PF UAN"] ||
      row.UAN ||
      "N/A",

    paidDays:
      Number(row["Effective Work Days"] || row["Paid Days"] || 30),

    lop,

    payMonth: `${payMonth} ${payYear}`,

    earnings: [
      { label: "BASIC", amount: basic },
      { label: "HRA", amount: hra },
      { label: "CONVEYANCE", amount: conveyance },
      { label: "MEDICAL", amount: medical },
      { label: "OTHER ALLOWANCE", amount: special },
    ].filter((item) => Number(item.amount) > 0),

    deductions: [
      { label: "PF", amount: pf },
      { label: "ESI", amount: esi },
      { label: "PROF TAX", amount: ptax },
      { label: "TDS", amount: tds },
    ].filter((item) => Number(item.amount) > 0),

    totalEarnings,
    totalDeductions,
    netPay,
    netPayWords: numberToWords(netPay),
  };
}