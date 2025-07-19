const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function fetchPage() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Set user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36');

  // Go to the page and wait for network to be idle (no more requests)
  await page.goto('https://targetwebsite.com', { waitUntil: 'networkidle2' });

  // Wait for an element you expect to exist in the real page, e.g. a selector unique to the content
  await page.waitForSelector('body');

  const pageTitle = await page.title();
  const content = await page.content();

  await browser.close();
  return { pageTitle, content };
}
