const fsPromises = require('fs/promises');
const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const path = require('path');

const folderPath = path.join(__dirname, 'styles');

async function createBundle(from) {
  const innerArray = await fsPromises.readdir(from, { withFileTypes: true });

  const cssFilesArray = innerArray.filter(item => {
    return item.isFile() && path.extname(item.name) === '.css';
  });

  let bundle = [];
  for (const file of cssFilesArray) {
    const readStream = createReadStream(path.join(from, file.name), 'utf-8');
    const writeStream = createWriteStream(path.join(from, '..', 'project-dist', 'bundle.css'));

    readStream.on('data', chunk => {
      bundle.push(chunk);
    });
    readStream.on('end', () => {
      bundle.forEach(item => writeStream.write(item));
    });
  }
}

createBundle(folderPath);
