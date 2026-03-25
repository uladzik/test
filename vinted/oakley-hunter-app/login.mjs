import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteerExtra.use(StealthPlugin());

const browser = await puppeteerExtra.launch({
  headless: false,
  args: ['--no-sandbox'],
  userDataDir: './vinted-session',
  defaultViewport: null,
});

const page = await browser.newPage();
await page.goto('https://www.vinted.it/login', { waitUntil: 'networkidle2' });

console.log('');
console.log('Log in to Vinted in the browser window.');
console.log('When done, press Enter here to save the session and close.');
console.log('');

process.stdin.once('data', async () => {
  await browser.close();
  console.log('Session saved to ./vinted-session');
  process.exit(0);
});
