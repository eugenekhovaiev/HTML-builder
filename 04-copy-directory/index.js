const fsPromises = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');

async function copyFiles(from) {
  const folderCopyPath = path.join(from, '..', 'files-copy');
  await fsPromises.mkdir(folderCopyPath, { recursive: true});

  let namesArray = await fsPromises.readdir(from);

  namesArray.forEach(name => {
    fsPromises.copyFile(path.join(folderPath, name), path.join(folderCopyPath, name));
  });
}

copyFiles(folderPath);