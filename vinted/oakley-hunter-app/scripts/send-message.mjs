// Hybrid approach: Puppeteer loads the page (bypasses DataDome),
// then fetch() runs inside browser context with real cookies/headers
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import { fileURLToPath } from 'url';

puppeteerExtra.use(StealthPlugin());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SESSION_DIR = path.join(__dirname, '..', 'vinted-session');

const input = JSON.parse(process.argv[2]);
const { itemId, message } = input;

const browser = await puppeteerExtra.launch({
  headless: false,
  args: ['--no-sandbox'],
  userDataDir: SESSION_DIR,
});

try {
  const page = await browser.newPage();

  // Load Vinted to establish session context
  await page.goto('https://www.vinted.it', { waitUntil: 'load', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  // Check login
  const loginBtn = await page.$('[data-testid="header--login-button"]');
  if (loginBtn) {
    process.stderr.write(JSON.stringify({ ok: false, error: 'NOT_LOGGED_IN' }));
    process.exit(1);
  }

  // Run fetch() from inside the browser — full cookies + headers included automatically
  const result = await page.evaluate(async ({ itemId, message }) => {
    // First create/find conversation
    const convRes = await fetch('/api/v2/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ item_id: Number(itemId), message }),
    });
    const convData = await convRes.json();
    return { status: convRes.status, data: convData };
  }, { itemId, message });

  if (result.status === 200 || result.data?.conversation) {
    process.stdout.write(JSON.stringify({ ok: true, conversationId: result.data?.conversation?.id }));
    process.exit(0);
  } else {
    process.stderr.write(JSON.stringify({ ok: false, error: result.data?.message_code || JSON.stringify(result) }));
    process.exit(1);
  }
} catch (e) {
  process.stderr.write(JSON.stringify({ ok: false, error: e.message }));
  process.exit(1);
} finally {
  await browser.close();
}
