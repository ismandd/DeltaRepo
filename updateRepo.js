const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto('https://delta.webfiles.pro/get_files.php', { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
      return {
        title: document.title,
      };
    });

    const repoPath = './repo.json';
    let repoData = {};

    if (fs.existsSync(repoPath)) {
      try {
        const fileContent = fs.readFileSync(repoPath, 'utf8');
        repoData = JSON.parse(fileContent);
      } catch (err) {
        console.warn('Warning: repo.json is not valid JSON, starting fresh');
        repoData = {};
      }
    }

    repoData.updatedAt = new Date().toISOString();
    repoData.pageTitle = data.title;

    fs.writeFileSync(repoPath, JSON.stringify(repoData, null, 2));

    await browser.close();
    console.log('repo.json updated successfully.');
  } catch (error) {
    console.error('Error updating repo.json:', error);
    process.exit(1);
  }
})();
