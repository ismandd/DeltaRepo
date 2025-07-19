const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://delta.webfiles.pro/get_files.php', { waitUntil: 'networkidle2' });
  
  // do whatever you want here
  
  await browser.close();
})();
