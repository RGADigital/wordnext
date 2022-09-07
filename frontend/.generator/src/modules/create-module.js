const { prompt } = require('enquirer');
const {
    toPascalCase,
    copyModuleFilesFromTemplate,
    toKebabCase,
    updateModulesIndex,
} = require('../utils');
const createFragment = require('./create-fragment');

async function createModule() {
    const { moduleName } = await prompt([
        {
            type: 'input',
            name: 'moduleName',
            message: 'Insert module name:',
            required: true,
        },
    ]);
    const { confirmation } = await prompt({
        type: 'confirm',
        name: 'confirmation',
        message: `Want to  create a new module called "${moduleName}"?`,
    });
    if (!confirmation) return console.log('Canceled module creation.');

    try {
        const reactModuleName = toPascalCase(moduleName);
        const folderName = toKebabCase(moduleName);
        copyModuleFilesFromTemplate(reactModuleName, folderName);
        updateModulesIndex(reactModuleName, folderName);
        createFragment(moduleName);
    } catch (e) {
        console.error('Error: ', e.message);
    }
}

module.exports = createModule;
