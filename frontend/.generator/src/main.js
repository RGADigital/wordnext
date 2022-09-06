const {prompt} = require("enquirer");
const createComponent = require("./modules/create-component");

const MODULES = {
    CREATE_COMPONENT: {
        key: "CREATE_COMPONENT",
        message: "Create a new Component",
        action: createComponent,
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
            ],
        },
    ]);

    const module = MODULES[moduleName].action;

    module();
}

module.exports = main;

