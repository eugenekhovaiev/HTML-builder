const fsPromises = require('fs/promises');
const createWriteStream = require('fs').createWriteStream;

const path = require('path');

const readFileFromStream = require('../01-read-file/index');
const createBundle = require('../05-merge-styles/index');
const copyDir = require('../04-copy-directory/index');

const templateHtmlPath = path.join(__dirname, 'template.html');
const componentsFolderPath = path.join(__dirname, 'components');
const stylesFolderPath = path.join(__dirname, 'styles');
const assetsFolderPath = path.join(__dirname, 'assets');
const distFolderPath = path.join(__dirname, 'project-dist');

async function buildPage(templatePath, componentsPath, stylesPath, assetsPath, distPath) {
  let htmlInner = await readFileFromStream(templatePath);
  let componentsFiles = await fsPromises.readdir(componentsPath, { withFileTypes: true });
  let componentsInnerObj = {};
  for (const file of componentsFiles) {
    componentsInnerObj[file.name.replace(path.extname(file.name), '')] = await readFileFromStream(path.join(componentsPath, file.name));
  }
  for (const key in componentsInnerObj) {
    htmlInner = htmlInner.replace(`{{${ key }}}`, componentsInnerObj[key]);
  }

  await fsPromises.mkdir(distPath, { recursive: true});

  const indexHtmlPath = path.join(distPath, 'index.html');
  const writeStream = createWriteStream(path.join(indexHtmlPath));
  writeStream.write(htmlInner);

  createBundle(stylesPath, path.join(distPath, 'style.css'));

  copyDir(assetsPath, path.join(distPath, 'assets'));
}

buildPage(templateHtmlPath, componentsFolderPath, stylesFolderPath, assetsFolderPath, distFolderPath);
