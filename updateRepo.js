const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://delta.webfiles.pro/get_files.php', { waitUntil: 'networkidle2' });

  const content = await page.evaluate(() => document.body.innerText);
  require('fs').writeFileSync('repo.json', content);

  await browser.close();
})();

