const fsPromises = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const distPath = path.join(folderPath, '..', 'files-copy');

async function copyDir(srcPath, distPath) {
  await fsPromises.rm(distPath, { force: true, recursive: true });
  await fsPromises.mkdir(distPath, { recursive: true });

  let itemsArray = await fsPromises.readdir(srcPath, { withFileTypes: true });

  for (let i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].isDirectory()) {
      copyDir(path.join(srcPath, itemsArray[i].name), path.join(distPath, itemsArray[i].name));
    } else {
      fsPromises.copyFile(path.join(srcPath, itemsArray[i].name), path.join(distPath, itemsArray[i].name));
    }
  }
}

if (require.main === module) {
  copyDir(folderPath, distPath);
}

module.exports = copyDir;