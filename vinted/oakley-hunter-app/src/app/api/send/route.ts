import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import { markSeen, removeResult } from "@/lib/store";

const SCRIPT = path.join(process.cwd(), "scripts", "send-message.mjs");

export async function POST(req: NextRequest) {
  const { itemId, itemLink, message } = await req.json();

  if (!itemId || !itemLink || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  return new Promise<NextResponse>((resolve) => {
    const arg = JSON.stringify({ itemLink, message });
    const child = spawn("node", [SCRIPT, arg], { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));

    child.on("close", (code) => {
      if (code === 0) {
        markSeen(itemId);
        removeResult(itemId);
        resolve(NextResponse.json({ ok: true }));
      } else {
        try {
          const parsed = JSON.parse(stderr.trim());
          if (parsed.error === "NOT_LOGGED_IN") {
            resolve(NextResponse.json({ ok: false, error: "NOT_LOGGED_IN" }, { status: 401 }));
          } else {
            resolve(NextResponse.json({ ok: false, error: parsed.error }, { status: 500 }));
          }
        } catch {
          resolve(NextResponse.json({ ok: false, error: stderr || "Script failed" }, { status: 500 }));
        }
      }
    });
  });
}
