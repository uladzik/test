import puppeteer from 'puppeteer';

async function run() {
    console.log("🚀 Запуск браузера...");
    try {
        const browser = await puppeteer.launch({ 
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        console.log("📡 Устанавливаю связь со страницей...");

        // Идем на немецкий Vinted, раз ты в Германии
        await page.goto('https://www.vinted.de/catalog?search_text=Stone+Island', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        console.log("👀 Смотри в окно браузера! Если там капча — реши её.");
        console.log("⏳ Жду 10 секунд...");
        
        await new Promise(r => setTimeout(r, 10000));

        const data = await page.evaluate(() => {
            const items = [];
            document.querySelectorAll('[data-testid^="grid-item"]').forEach(el => {
                const title = el.querySelector('a')?.title;
                const price = el.querySelector('[data-testid$="--price"]')?.innerText;
                if (title && price) items.push({ title, price });
            });
            return items;
        });

        if (data.length > 0) {
            console.log("✅ УСПЕХ! Найдено товаров:", data.length);
            console.table(data.slice(0, 5));
        } else {
            console.log("⚠️ Страница загрузилась, но товары не найдены. Возможно, нужно нажать 'Принять куки' в браузере.");
        }

    } catch (err) {
        console.error("❌ Ошибка выполнения:", err.message);
    }
}

run();