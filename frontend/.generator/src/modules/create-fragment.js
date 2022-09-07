const { prompt } = require('enquirer');
const fs = require('fs');
const path = require('path');
const { GRAPH_QUERIES_PATH, FRAGMENT_PATH } = require('../config');
const {
    copyFragmentFilesFromTemplate,
    updateFragmentsIndex,
} = require('../utils');

const graphQueriesPath = path.join(__dirname, GRAPH_QUERIES_PATH);
const queriesFiles = fs.readdirSync(graphQueriesPath);

const FRAGMENT_INJECTION_CHOICES = queriesFiles.map((file) => {
    return {
        name: file,
    };
});

async function createFragment(moduleName) {
    let fragmentName;

    if (moduleName) {
        const { fName } = await prompt([
            {
                type: 'input',
                name: 'fName',
                message: 'Insert fragment name:?',
                required: true,
            },
        ]);

        fragmentName = fName;
    } else {
        fragmentName = moduleName;
    }

    const { fragmentTarget } = await prompt([
        {
            type: 'select',
            name: 'fragmentTarget',
            message: 'Where do you want to inject this fragment?',
            choices: FRAGMENT_INJECTION_CHOICES,
        },
    ]);

    try {
        const fragmentTargetFile = path.join(graphQueriesPath, fragmentTarget);
        const fragmentFolder = path.join(__dirname, FRAGMENT_PATH);

        copyFragmentFilesFromTemplate(
            fragmentName,
            fragmentFolder,
            fragmentTargetFile
        );
        updateFragmentsIndex(fragmentName, fragmentFolder);
    } catch (e) {
        console.error('Error: ', e.message);
    }
}

module.exports = createFragment;
