import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import puppeteer from 'puppeteer';

const server = new Server({
    name: "vinted-final-boss",
    version: "2.5.0",
}, {
    capabilities: { tools: {} },
});

async function searchVinted(query, maxPrice = 150) {
    const browser = await puppeteer.launch({ 
        headless: "new", 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    // Прямая ссылка с фильтрами: Сортировка по новым (newest_first) и цена
    const url = `https://www.vinted.de/catalog?search_text=${encodeURIComponent(query)}&price_to=${maxPrice}&order=newest_first&currency=EUR`;
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Клик по куки
        try {
            const btn = '#onetrust-accept-btn-handler';
            await page.waitForSelector(btn, { timeout: 4000 });
            await page.click(btn);
        } catch (e) {}

        await page.waitForSelector('[data-testid^="grid-item"]', { timeout: 10000 });

        const results = await page.evaluate(() => {
            const cards = document.querySelectorAll('[data-testid^="grid-item"]');
            return Array.from(cards).slice(0, 15).map(card => {
                const title = card.querySelector('a')?.title || "N/A";
                const price = card.querySelector('[data-testid$="--price"]')?.innerText.replace('\n', ' ') || "N/A";
                const link = card.querySelector('a')?.href;
                return { title, price, link };
            });
        });
        return results;
    } finally {
        await browser.close();
    }
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [{
        name: "vinted_search",
        description: "Search Vinted.de for items (newest first, max price 150)",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "Search query" },
                maxPrice: { type: "number", default: 150 }
            },
            required: ["query"]
        }
    }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "vinted_search") {
        const { query, maxPrice } = request.params.arguments;
        const data = await searchVinted(query, maxPrice);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
});

const transport = new StdioServerTransport();
await server.connect(transport);
