const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch browser with no-sandbox flags for GitHub Actions environment
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Navigate to your target page (replace with your URL)
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

    // Extract the data you need from the page
    // Example: get the page title, replace with your scraping logic
    const data = await page.evaluate(() => {
      return {
        title: document.title,
        // Add other data extraction here
      };
    });

    // Read existing repo.json or create an empty object if it doesn't exist
    let repoData = {};
    const repoPath = './repo.json';
    if (fs.existsSync(repoPath)) {
      repoData = JSON.parse(fs.readFileSync(repoPath, 'utf8'));
    }

    // Update repoData with scraped data (adjust this to your needs)
    repoData.updatedAt = new Date().toISOString();
    repoData.pageTitle = data.title;

    // Write updated data back to repo.json
    fs.writeFileSync(repoPath, JSON.stringify(repoData, null, 2));

    await browser.close();
    console.log('repo.json updated successfully.');
  } catch (error) {
    console.error('Error updating repo.json:', error);
    process.exit(1);
  }
})();
