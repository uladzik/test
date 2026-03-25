import fs from "fs";
import path from "path";
import type { VintedItem } from "./scraper";

const DATA_DIR = path.join(process.cwd(), "src/data");
const RESULTS_FILE = path.join(DATA_DIR, "results.json");
const SEEN_FILE = path.join(DATA_DIR, "seen.json");

export function readResults(): VintedItem[] {
  try {
    return JSON.parse(fs.readFileSync(RESULTS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function writeResults(items: VintedItem[]) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(items, null, 2));
}

export function readSeen(): string[] {
  try {
    return JSON.parse(fs.readFileSync(SEEN_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function markSeen(id: string) {
  const seen = readSeen();
  if (!seen.includes(id)) {
    seen.push(id);
    fs.writeFileSync(SEEN_FILE, JSON.stringify(seen, null, 2));
  }
}

export function removeResult(id: string) {
  const results = readResults().filter((r) => r.id !== id);
  writeResults(results);
}

export function mergeNewResults(fresh: VintedItem[]) {
  const seen = readSeen();
  const existing = readResults();
  const existingIds = new Set(existing.map((r) => r.id));

  const newItems = fresh.filter((r) => !seen.includes(r.id) && !existingIds.has(r.id));
  writeResults([...newItems, ...existing]);
  return newItems.length;
}
