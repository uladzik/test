import { NextRequest, NextResponse } from "next/server";
import { markSeen, removeResult } from "@/lib/store";

export async function POST(req: NextRequest) {
  const { itemId } = await req.json();
  if (!itemId) return NextResponse.json({ ok: false }, { status: 400 });

  markSeen(itemId);
  removeResult(itemId);

  return NextResponse.json({ ok: true });
}
