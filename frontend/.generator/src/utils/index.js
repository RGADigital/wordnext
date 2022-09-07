const fs = require('fs');
const path = require('path');
const {
    COMPONENT_PATH,
    MODULE_PATH,
    TEMPLATE_DIR_PATH,
    TEMPLATE_FRAGMENT_DIR_PATH,
    FRAGMENT_PATH,
} = require('../config');

function copyComponentFilesFromTemplate(componentName, folderName) {
    const basePath = path.join(__dirname, COMPONENT_PATH);
    const componentPath = path.join(basePath, folderName);

    if (fs.existsSync(componentPath))
        throw new Error('A component with that name already exists.');
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
    fs.mkdirSync(componentPath);

    const templateDirPath = path.join(__dirname, TEMPLATE_DIR_PATH);
    const templateFiles = fs.readdirSync(templateDirPath);

    templateFiles.forEach((file) => {
        let fileContent = fs.readFileSync(
            path.join(templateDirPath, file),
            'utf8'
        );
        fileContent = fileContent.replace(/Component/g, componentName);
        fileContent = fileContent.replace(/component/g, folderName);

        const destination = path.join(
            componentPath,
            file.replace(/Component/g, folderName)
        );
        fs.writeFileSync(destination, fileContent, 'utf-8');
        console.log(path.join(COMPONENT_PATH, folderName));
    });

    console.log('Files copied from template.');
}

function copyModuleFilesFromTemplate(moduleName, folderName) {
    const basePath = path.join(__dirname, MODULE_PATH);
    const modulePath = path.join(basePath, folderName);

    if (fs.existsSync(modulePath))
        throw new Error('A component with that name already exists.');
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
    fs.mkdirSync(modulePath);

    const templateDirPath = path.join(__dirname, TEMPLATE_DIR_PATH);
    const templateFiles = fs.readdirSync(templateDirPath);

    templateFiles.forEach((file) => {
        let fileContent = fs.readFileSync(
            path.join(templateDirPath, file),
            'utf8'
        );
        fileContent = fileContent.replace(/Component/g, moduleName);
        fileContent = fileContent.replace(/component/g, folderName);

        const destination = path.join(
            modulePath,
            file.replace(/Component/g, folderName)
        );
        fs.writeFileSync(destination, fileContent, 'utf-8');
        console.log(path.join(MODULE_PATH, folderName));
    });

    console.log('Files copied from template.');
}

function copyFragmentFilesFromTemplate(
    fragmentName,
    fragmentFolder,
    fragmentTargetFile
) {
    const templateDirPath = path.join(__dirname, TEMPLATE_FRAGMENT_DIR_PATH);
    const templateFiles = fs.readdirSync(templateDirPath);

    templateFiles.forEach((file) => {
        let fileContent = fs.readFileSync(
            path.join(templateDirPath, file),
            'utf8'
        );

        fileContent = fileContent.replace(
            /Module_FRAGMENT/g,
            `${toUpperCaseScript(fragmentName)}_FRAGMENT`
        );
        fileContent = fileContent.replace(
            /ModuleFragment/g,
            `${toPascalCase(fragmentName)}Fragment`
        );
        fileContent = fileContent.replace(
            /Page_Container_Modules_Module/g,
            `Page_Container_Modules_${toCapFirstScript(fragmentName)}`
        );

        const destination = path.join(
            fragmentFolder,
            file.replace(/Fragment/g, toKebabCase(fragmentName))
        );

        fs.writeFileSync(destination, fileContent, 'utf-8');
        console.log(path.join(FRAGMENT_PATH, toKebabCase(fragmentName)));
    });

    console.log('Files copied from template.');

    let fileInjectionContent = fs.readFileSync(fragmentTargetFile, 'utf8');

    fileInjectionContent = fileInjectionContent.replace(
        /\/\* INJECTION_IMPORT \*\//g,
        `/* INJECTION IMPORT */
        ${toUpperCaseScript(fragmentName)}_FRAGMENT,`
    );

    fileInjectionContent = fileInjectionContent.replace(
        /\"\"\"FRAGMENT_DECONSTRUCTION\"\"\"/g,
        `"""FRAGMENT_DECONSTRUCTION"""
        ...${toPascalCase(fragmentName)}Fragment`
    );

    fileInjectionContent = fileInjectionContent.replace(
        /\"\"\"FRAGMENT_IN_IMPORT\"\"\"/g,
        `"""FRAGMENT_DECONSTRUCTION"""
        \$\{${toUpperCaseScript(fragmentName)}_FRAGMENT}`
    );

    fs.writeFileSync(fragmentTargetFile, fileInjectionContent, 'utf-8');
    console.log(`${path.join(fragmentTargetFile)} fragment injected`);
}

function updateComponentsIndex(componentName, folderName) {
    const basePath = path.join(__dirname, COMPONENT_PATH);
    const indexPath = path.join(basePath, 'index.js');

    fs.appendFileSync(
        indexPath,
        `export { default as ${componentName} } from \'./${folderName}\';\n`,
        'utf8'
    );

    console.log(`${indexPath} updated`);
}

function updateModulesIndex(moduleName, folderName) {
    const basePath = path.join(__dirname, MODULE_PATH);
    const indexPath = path.join(basePath, 'index.js');

    fs.appendFileSync(
        indexPath,
        `export { default as ${moduleName} } from \'./${folderName}\';\n`,
        'utf8'
    );

    console.log(`${indexPath} updated`);
}

function updateFragmentsIndex(fragmentName, fragmentFolder) {
    const indexPath = path.join(fragmentFolder, 'index.js');

    fs.appendFileSync(
        indexPath,
        `export * from \'./${toKebabCase(fragmentName)}\';\n`,
        'utf8'
    );

    console.log(`${indexPath} updated`);
}

const toPascalCase = (sentence) =>
    sentence
        .replace('-', ' ')
        .replace('_', ' ')
        .split(' ')
        .map((word) => word[0].toUpperCase().concat(word.slice(1)))
        .join('');

const toKebabCase = (str) =>
    str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join('-');

const toCapFirstScript = (sentence) =>
    sentence
        .replace('-', ' ')
        .replace('_', ' ')
        .split(' ')
        .map((word) => word[0].toUpperCase().concat(word.slice(1)))
        .join('_');

const toUpperCaseScript = (sentence) =>
    toCapFirstScript(sentence).toUpperCase();

module.exports = {
    toKebabCase,
    toPascalCase,
    copyComponentFilesFromTemplate,
    updateComponentsIndex,
    copyModuleFilesFromTemplate,
    updateModulesIndex,
    copyFragmentFilesFromTemplate,
    updateFragmentsIndex,
    toCapFirstScript,
    toUpperCaseScript,
};