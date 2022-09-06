const fs = require("fs")
const path = require("path")
const {COMPONENT_PATH, TEMPLATE_DIR_PATH} = require("../config");

function copyFilesFromTemplate(componentName, folderName) {
    const basePath = path.join(__dirname, COMPONENT_PATH);
    const componentPath = path.join(basePath, folderName);

    if (fs.existsSync(componentPath)) throw new Error('A component with that name already exists.');
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
    fs.mkdirSync(componentPath);

    const templateDirPath = path.join(__dirname, TEMPLATE_DIR_PATH);
    const templateFiles = fs.readdirSync(templateDirPath);

    templateFiles.forEach((file) => {
        let fileContent = fs.readFileSync(path.join(templateDirPath, file), 'utf8');
        fileContent = fileContent.replace(/Component/g, componentName);
        fileContent = fileContent.replace(/component/g, folderName);

        const destination = path.join(
            componentPath,
            file.replace(/Component/g, folderName),
        );
        fs.writeFileSync(destination, fileContent, 'utf-8');
        console.log(path.join(COMPONENT_PATH, folderName));
    });

    console.log('Files copied from template.');
}

function updateComponentsIndex (componentName, folderName) {
    const basePath = path.join(__dirname, COMPONENT_PATH);
    const indexPath = path.join(basePath, 'index.js');

    fs.appendFileSync(indexPath, `export { default as ${componentName} } from \'./${folderName}\';\n`, 'utf8');

    console.log(`${indexPath} updated`);
}

const toPascalCase = (sentence) => sentence
  .replace('-', ' ')
  .replace('_', ' ')
  .split(' ')
  .map(word => word[0]
    .toUpperCase()
    .concat(word.slice(1))
  )
  .join('');

const toKebabCase = str =>  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

module.exports = {
    toKebabCase,
    toPascalCase,
    copyFilesFromTemplate,
    updateComponentsIndex,
}
