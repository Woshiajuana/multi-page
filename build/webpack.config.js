
const {
    resolve,
    isEnvProduction,
    generateEntryByPath,
    generateHtmlWebpackPluginsByEntry,
} = require('./utils');

const {
    entryRoot,
    outputRoot,
} = require('./config');


const entry = generateEntryByPath(entryRoot);

module.exports = {

    // 模式
    mode: isEnvProduction ? 'production' : 'development',

    // 入口
    entry,

    // 出口
    output: {
        path: outputRoot,
        filename: ``
    }
};
