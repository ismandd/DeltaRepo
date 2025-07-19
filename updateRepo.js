const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the URL
    await page.goto('https://delta.webfiles.pro/get_files.php', { waitUntil: 'networkidle2' });

    // Wait a little just in case
    await page.waitForTimeout(1000);

    // Get the full page content (likely JSON)
    const content = await page.evaluate(() => document.body.innerText);

    // Save the content to a file, assuming JSON
    fs.writeFileSync('repoData.json', content);

    console.log('Repo data saved to repoData.json');

    await browser.close();
  } catch (err) {
    console.error('Error fetching repo data:', err);
  }
})();
