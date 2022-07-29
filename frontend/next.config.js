const path = require('path');

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `
            @import 'common';
            @import 'fonts';
            @import 'mixins';
            @import 'variables';
            @import 'overrides';
        `,
    },
    webpack: (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                modules: ['node_modules'],
                alias: {
                    ...config.resolve.alias,
                    graphql: path.resolve(__dirname, 'graphql/'),
                    lib: path.resolve(__dirname, 'lib/'),
                    hooks: path.resolve(__dirname, 'hooks/'),
                    layouts: path.resolve(__dirname, 'layouts'),
                    components: path.resolve(__dirname, 'components/'),
                    modules: path.resolve(__dirname, 'modules/'),
                    styles: path.resolve(__dirname, 'styles/'),
                    intl: path.resolve(__dirname, 'intl/'),
                },
            },
        };
    },
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ['en', 'es'],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: 'en',
    },
};
