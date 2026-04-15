// import * as XLSX from "xlsx";

// export async function parseExcelFile(fileBuffer) {
//   const workbook = XLSX.read(fileBuffer, { type: "buffer" });
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];
//   const rows = XLSX.utils.sheet_to_json(sheet);
//   return rows;
// }



import * as XLSX from "xlsx";

export async function parseExcelFile(fileBuffer) {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const rawRows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
    blankrows: false,
  });

  let headerRowIndex = -1;

  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i].map((cell) => String(cell || "").trim().toUpperCase());

    if (row.includes("MONTH") && row.includes("YEAR")) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    throw new Error("Could not find header row containing MONTH and YEAR.");
  }

  const headers = rawRows[headerRowIndex].map((cell) => String(cell || "").trim());

  const dataRows = rawRows.slice(headerRowIndex + 1);

  const parsedRows = dataRows
    .map((row) => {
      const obj = {};

      headers.forEach((header, index) => {
        if (header) {
          obj[header] = row[index] ?? "";
        }
      });

      return obj;
    })
    .filter((row) =>
      Object.values(row).some((value) => String(value || "").trim() !== "")
    );

  return parsedRows;
}