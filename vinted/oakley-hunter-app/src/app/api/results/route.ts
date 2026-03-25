import { NextResponse } from "next/server";
import { readResults } from "@/lib/store";

export async function GET() {
  const results = readResults();
  return NextResponse.json(results);
}
