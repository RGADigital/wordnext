const { prompt } = require('enquirer');
const createComponent = require('./modules/create-component');
const createModule = require('./modules/create-module.js');
const createFragment = require('./modules/create-fragment.js');

const MODULES = {
    CREATE_COMPONENT: {
        key: 'CREATE_COMPONENT',
        message: 'Create a new Component',
        action: createComponent,
    },
    CREATE_MODULE: {
        key: 'CREATE_MODULE',
        message: 'Create a new Module',
        action: createModule,
    },
    CREATE_FRAGMENT: {
        key: 'CREATE_FRAGMENT',
        message: 'Create a new Fragment',
        action: createFragment,
    },
};

async function main() {
    const { moduleName } = await prompt([
        {
            type: 'select',
            name: 'moduleName',
            message: 'What do you want to do?',
            choices: [
                {
                    name: MODULES.CREATE_COMPONENT.key,
                    message: MODULES.CREATE_COMPONENT.message,
                    value: MODULES.CREATE_COMPONENT.key,
                },
                {
                    name: MODULES.CREATE_MODULE.key,
                    message: MODULES.CREATE_MODULE.message,
                    value: MODULES.CREATE_MODULE.key,
                },
                {
                    name: MODULES.CREATE_FRAGMENT.key,
                    message: MODULES.CREATE_FRAGMENT.message,
                    value: MODULES.CREATE_FRAGMENT.key,
                },
            ],
        },
    ]);

    const module = MODULES[moduleName].action;

    module();
}

module.exports = main;
