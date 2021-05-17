/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAlias = require('craco-alias');

module.exports = async () => {
    return {
        plugins: [{
            plugin: CracoAlias,
            options: {
                source: 'options',
                baseUrl: './src',
                aliases: {
                    '@': './components/',
                }
            }
        }
        ]
    };
};