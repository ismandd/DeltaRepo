const fs = require('fs').promises;

async function updateRepoJson() {
  try {
    const data = await fs.readFile('repo.json', 'utf8');
    const json = JSON.parse(data);

    // Update the timestamp
    json.lastUpdated = new Date().toISOString();

    // Add your custom logic here, e.g. fetch new data, update `json.data`

    await fs.writeFile('repo.json', JSON.stringify(json, null, 2), 'utf8');
    console.log('repo.json updated successfully.');
  } catch (err) {
    console.error('Error updating repo.json:', err);
  }
}

updateRepoJson();
