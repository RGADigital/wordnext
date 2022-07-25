const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    stories: [
        path.resolve(__dirname, '../components/**/*.stories.mdx'),
        path.resolve(__dirname, '../components/**/*.stories.@(js|jsx|ts|tsx)'),
        path.resolve(__dirname, '../modules/**/*.stories.@(js|jsx|ts|tsx)'),
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
    ],
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config) => {
        return {
            ...config,
            plugins: [
                ...config.plugins,
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: path.resolve(
                                __dirname,
                                '../public/assets/fonts'
                            ),
                            to: 'assets/fonts',
                        },
                    ],
                }),
            ],
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.scss$/,
                        use: [
                            'style-loader',
                            'css-loader?modules&importLoaders',
                            'sass-loader',
                            {
                                loader: require.resolve(
                                    'sass-resources-loader'
                                ),
                                options: {
                                    resources: [
                                        path.resolve(
                                            __dirname,
                                            '../styles/common.scss'
                                        ),
                                        path.resolve(
                                            __dirname,
                                            '../styles/fonts.scss'
                                        ),
                                        path.resolve(
                                            __dirname,
                                            '../styles/mixins.scss'
                                        ),
                                        path.resolve(
                                            __dirname,
                                            '../styles/reset.scss'
                                        ),
                                        path.resolve(
                                            __dirname,
                                            '../styles/variables.scss'
                                        ),
                                        path.resolve(
                                            __dirname,
                                            '../styles/overrides.scss'
                                        ),
                                    ],
                                },
                            },
                        ],
                        include: path.resolve(__dirname, '../'),
                    },
                ],
            },
            resolve: {
                ...config.resolve,
                modules: ['node_modules'],
                alias: {
                    ...config.resolve.alias,
                    graphql: path.resolve(__dirname, 'graphql/'),
                    hooks: path.resolve(__dirname, 'hooks/'),
                    layouts: path.resolve(__dirname, 'layouts'),
                    components: path.resolve(__dirname, 'components/'),
                    modules: path.resolve(__dirname, 'modules/'),
                    styles: path.resolve(__dirname, 'styles/'),
                },
            },
        };
    },
};
