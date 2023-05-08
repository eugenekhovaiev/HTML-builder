const fsPromises = require('fs/promises');
const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const path = require('path');

const srcPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundle(srcPath, distPath) {
  const innerArray = await fsPromises.readdir(srcPath, { withFileTypes: true });
  
  const cssFilesArray = innerArray.filter(item => {
    return item.isFile() && path.extname(item.name) === '.css';
  });

  let bundle = [];
  for (const file of cssFilesArray) {
    const readStream = createReadStream(path.join(srcPath, file.name), 'utf-8');
    const writeStream = createWriteStream(distPath);

    readStream.on('data', chunk => {
      bundle.push(chunk + '\n');
    });
    readStream.on('end', () => {
      bundle.forEach(item => writeStream.write(item));
    });
  }
}

if (require.main === module) {
  createBundle(srcPath, distPath);
}

module.exports = createBundle;