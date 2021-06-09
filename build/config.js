
const { isEnvProduction, resolve } = require('./utils');

module.exports = {
    // 入口
    entryRoot: resolve('src/pages'),

    // 出口
    outputRoot: resolve('dist'),
};
