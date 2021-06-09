
const path = require('path');
const isEnvProduction = process.env.NODE_ENV === 'production';
const isDevServer = process.env.NODE_ENV === 'devserver';
const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {

    isDevServer,

    isEnvProduction,

    // 入口
    entryRoot: resolve('src/pages'),

    // 出口配置
    assetsRoot: resolve('dist'),
    assetsPublicPath: isDevServer ? '/' : './',
    assetsSubDirectory: 'assets',
};
