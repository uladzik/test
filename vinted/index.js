import puppeteer from 'puppeteer';

async function run() {
    console.log("🚀 Начинаю парсинг Vinted.de...");
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: null,
        args: ['--start-maximized'] 
    });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.vinted.de/catalog?search_text=Oakley sunglasses', {
            waitUntil: 'networkidle2'
        });

        console.log("⏳ Обработка куки...");
        const cookieBtn = '#onetrust-accept-btn-handler';
        try {
            await page.waitForSelector(cookieBtn, { visible: true, timeout: 5000 });
            await page.click(cookieBtn);
            console.log("✅ Куки приняты!");
        } catch (e) {
            console.log("ℹ️ Баннер не найден.");
        }

        // Ждем товары
        await page.waitForSelector('[data-testid$="--description"]', { timeout: 10000 });

        const products = await page.evaluate(() => {
            const cards = document.querySelectorAll('[data-testid^="grid-item"]');
            return Array.from(cards).slice(0, 5).map(card => ({
                title: card.querySelector('a')?.title || "N/A",
                price: card.querySelector('[data-testid$="--price"]')?.innerText || "0",
                link: card.querySelector('a')?.href
            }));
        });

        console.log("🎯 Результаты:");
        console.table(products);

        console.log("☕️ Окно будет открыто 60 секунд для настройки фильтров...");
        await new Promise(r => setTimeout(r, 60000)); 

    } catch (err) {
        console.error("❌ Ошибка:", err.message);
    } finally {
        await browser.close();
    }
}

run();
