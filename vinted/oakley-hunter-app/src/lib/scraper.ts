import puppeteer from "puppeteer";
import oakleyDb from "../oakley-db.json";

export interface VintedItem {
  id: string;
  model: string; // matched model name
  modelFamily: string;
  title: string;
  price: number;
  priceStr: string;
  offerPrice: number; // -40%
  link: string;
  imageUrl?: string;
  condition?: string;
  draftMessage: string;
  scrapedAt: string;
}

function generateDraft(item: { title: string; price: number; offerPrice: number }): string {
  return `Hi! I saw your ${item.title} listing. I'm interested in buying — would you consider ${item.offerPrice}€? Happy to buy right away. Thanks!`;
}

function parsePrice(str: string): number {
  const match = str.match(/([\d.,]+)\s*€/);
  if (!match) return 0;
  return parseFloat(match[1].replace(",", "."));
}

export async function scrapeVinted(maxPrice = 150): Promise<VintedItem[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const allResults: VintedItem[] = [];

  // Group keywords to avoid too many requests
  const queries = oakleyDb.models
    .filter((m) => m.tier === "iconic" || m.tier === "high")
    .map((m) => ({ model: m.name, family: m.family, keyword: m.keywords[0] }));

  for (const q of queries) {
    const page = await browser.newPage();
    const url = `https://www.vinted.it/catalog?search_text=${encodeURIComponent(
      "Oakley " + q.keyword
    )}&price_to=${maxPrice}&order=newest_first&currency=EUR`;

    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

      // Accept cookies once
      try {
        await page.waitForSelector("#onetrust-accept-btn-handler", { timeout: 3000 });
        await page.click("#onetrust-accept-btn-handler");
        await new Promise((r) => setTimeout(r, 1000));
      } catch {}

      await page.waitForSelector('[data-testid^="grid-item"]', { timeout: 8000 });

      const items = await page.evaluate(() => {
        const cards = document.querySelectorAll('[data-testid^="grid-item"]');
        return Array.from(cards)
          .slice(0, 10)
          .map((card) => {
            const a = card.querySelector("a");
            const title = a?.title || "";
            const link = a?.href || "";
            const img = card.querySelector("img")?.src || "";
            const priceEl = card.querySelector('[data-testid$="--price-text"]');
            const priceStr = priceEl?.textContent || "";
            return { title, link, img, priceStr };
          })
          .filter((i) => i.link.includes("/items/"));
      });

      for (const item of items) {
        // Extract price from title or priceStr
        const priceRaw = item.priceStr || item.title;
        const price = parsePrice(priceRaw) || parsePrice(item.title);
        if (price === 0 || price > maxPrice) continue;

        // Filter: must contain "Oakley" in title
        if (!item.title.toLowerCase().includes("oakley")) continue;

        const offerPrice = Math.round(price * 0.58); // -42%
        const itemId = item.link.match(/items\/(\d+)/)?.[1] || "";

        allResults.push({
          id: itemId,
          model: q.model,
          modelFamily: q.family,
          title: item.title.split(",")[0].trim(),
          price,
          priceStr: `${price}€`,
          offerPrice,
          link: item.link,
          imageUrl: item.img,
          draftMessage: generateDraft({ title: item.title.split(",")[0], price, offerPrice }),
          scrapedAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      // Skip failed queries
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Deduplicate by item id
  const seen = new Set<string>();
  return allResults.filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}
