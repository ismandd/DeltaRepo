const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://delta.webfiles.pro/get_files.php', { waitUntil: 'networkidle2' });
  
  // You can get the page content after JS executes
  const content = await page.content();
  console.log(content);
  
  await browser.close();
})();
