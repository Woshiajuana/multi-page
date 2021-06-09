
const { isEnvProduction, resolve } = require('./utils');

module.exports = {

    // 入口
    entryRoot: resolve('src/pages'),

    // 出口配置
    assetsRoot: resolve('dist'),
    assetsPublicPath: './',
    assetsSubDirectory: 'assets',
};
