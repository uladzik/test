import { NextResponse } from "next/server";
import { scrapeVinted } from "@/lib/scraper";
import { mergeNewResults } from "@/lib/store";

export async function POST() {
  try {
    const results = await scrapeVinted(150);
    const newCount = mergeNewResults(results);
    return NextResponse.json({ ok: true, total: results.length, new: newCount });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
