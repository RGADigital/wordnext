const {prompt} = require("enquirer");
const {toPascalCase, copyFilesFromTemplate, toKebabCase, updateComponentsIndex} = require("../utils");

async function createComponent() {
    const { componentName } = await prompt([
        {
            type: 'input',
            name: 'componentName',
            message: 'Insert component name:',
            required: true,
        },
    ]);
    const { confirmation } = await prompt({
        type: 'confirm',
        name: 'confirmation',
        message: `Want to  create a new component called "${componentName}"?`,
    });
    if (!confirmation) return console.log('Canceled component creation.');

    try {
        const reactComponentName = toPascalCase(componentName);
        const folderName = toKebabCase(componentName);
        copyFilesFromTemplate(reactComponentName, folderName);
        updateComponentsIndex(reactComponentName, folderName);
    } catch (e) {
        console.error('Error: ', e.message);
    }

}

module.exports = createComponent;


