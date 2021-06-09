
const { merge } = require('webpack-merge');
const { resolve } = require('./utils');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {

    // loader 配置
    module: {
        rules: [
            // css 样式配置
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            // scss 样式
            {
                test: /\.s(c|a)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    // devServer
    devServer: {
        // 禁止安全检测
        disableHostCheck: true,
        // 运行的目录
        contentBase: resolve('public'),
        // host
        host: '0.0.0.0',
        // 启动 gzip 压缩
        compress: true,
        // 服务端口
        port: 9527,
        // 自动打开浏览器
        open: false,
        // 开启 hot
        hot: false,
    },

});
