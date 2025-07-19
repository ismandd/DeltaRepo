const https = require('https');
const fs = require('fs');

const url = 'https://delta.webfiles.pro/get_files.php';

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('Fetched JSON:', jsonData); // debug output

      // Write raw fetched JSON data exactly as it is
      fs.writeFile('repo.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to repo.json:', err);
        } else {
          console.log('repo.json updated successfully!');
        }
      });
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

}).on('error', (err) => {
  console.error('Error fetching URL:', err);
});
