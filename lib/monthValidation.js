function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\s+/g, " ");
}

function monthNameToNumber(month) {
  const months = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    sept: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };

  return months[normalizeText(month)] || null;
}

function parseExcelMonthYear(rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return null;
  }

  const value = String(rawValue).trim().toLowerCase();

  // Mar-2026 / March-2026 / Mar 2026 / March 2026
  let match = value.match(/^([a-z]+)[-\s](\d{4})$/i);
  if (match) {
    const month = monthNameToNumber(match[1]);
    const year = Number(match[2]);
    if (month && !Number.isNaN(year)) {
      return { month, year };
    }
  }

  // 03-2026 / 03/2026
  match = value.match(/^(\d{1,2})[/-](\d{4})$/);
  if (match) {
    const month = Number(match[1]);
    const year = Number(match[2]);
    if (month >= 1 && month <= 12) {
      return { month, year };
    }
  }

  // 2026-03 / 2026/03
  match = value.match(/^(\d{4})[/-](\d{1,2})$/);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    if (month >= 1 && month <= 12) {
      return { month, year };
    }
  }

  return null;
}

function getMonthCellValue(row) {
  // Your uploaded file uses MONTH
  if (row?.MONTH !== undefined && row?.MONTH !== null && String(row.MONTH).trim() !== "") {
    return row.MONTH;
  }

  // fallback names if sheet changes later
  const possibleKeys = [
    "Month",
    "Pay Month",
    "Payroll Month",
    "Salary Month",
    "Month Year",
    "Pay Period",
    "Payroll Period",
  ];

  for (const key of possibleKeys) {
    if (row?.[key] !== undefined && row?.[key] !== null && String(row[key]).trim() !== "") {
      return row[key];
    }
  }

  return null;
}

export function validateSelectedMonthAgainstExcel(rows, selectedMonth, selectedYear) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      valid: false,
      message: "Excel file has no rows.",
    };
  }

  const selectedMonthNum = monthNameToNumber(selectedMonth);
  const selectedYearNum = Number(selectedYear);

  if (!selectedMonthNum || Number.isNaN(selectedYearNum)) {
    return {
      valid: false,
      message: "Selected month/year is invalid.",
    };
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const excelMonthValue = getMonthCellValue(row);

    if (!excelMonthValue) {
      return {
        valid: false,
        message: `MONTH value is missing in row ${i + 2}.`,
      };
    }

    const parsed = parseExcelMonthYear(excelMonthValue);

    if (!parsed) {
      return {
        valid: false,
        message: `Invalid MONTH format "${excelMonthValue}" in row ${i + 2}. Expected like Mar-2026.`,
      };
    }

    if (parsed.month !== selectedMonthNum || parsed.year !== selectedYearNum) {
      return {
        valid: false,
        message: `Month mismatch in row ${i + 2}. Excel has "${excelMonthValue}" but you selected "${selectedMonth} ${selectedYear}".`,
      };
    }
  }

  return {
    valid: true,
    message: `All ${rows.length} rows matched ${selectedMonth} ${selectedYear}.`,
  };
}