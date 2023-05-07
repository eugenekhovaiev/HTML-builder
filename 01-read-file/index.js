const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

function readFileFromStream(filePath) {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(filePath, 'utf-8');
    
    let data = '';
    
    readStream.on('data', chunk => {
      data += chunk;
    });
    readStream.on('end', () => {
      resolve(data);
    });
  });
}

if (require.main === module) {
  readFileFromStream(filePath).then(data => console.log(data));
}

module.exports = readFileFromStream;