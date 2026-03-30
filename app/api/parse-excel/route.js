import { NextResponse } from "next/server";
import { parseExcelFile } from "../../../lib/excel";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const rows = await parseExcelFile(buffer);

    return NextResponse.json({ rows });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to parse Excel file" },
      { status: 500 }
    );
  }
}