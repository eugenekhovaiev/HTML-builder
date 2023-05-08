const fsPromises = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fsPromises.readdir(folderPath, { withFileTypes: true }).then(array => {
  array.forEach(item => {
    if (item.isFile()) {
      const fileExt = path.extname(item.name).slice(1);
      const fileName = item.name.replace(`.${ fileExt }`, '');
      
      fsPromises.stat(path.join(folderPath, item.name)).then(result => {
        const fileSize = `${ result.size / 1000 }kb`;
        console.log(`${ fileName } - ${ fileExt } - ${ fileSize }`);
      });
    }
  });
});