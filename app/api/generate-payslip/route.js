import { NextResponse } from "next/server";
import { buildPayslipData } from "../../../lib/payroll";

export async function POST(req) {
  try {
    const body = await req.json();
    const payslip = buildPayslipData(body);

    return NextResponse.json({
      message: "Payslip data generated successfully",
      payslip,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to generate payslip" },
      { status: 500 }
    );
  }
}