
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { generateEntry } = require('./utils');


// 生成入口文件
const entry = generateEntry(resolve(__dirname, '../src/pages'));

// 生成多入口模板 Html 文件插件
const htmlWebpackPlugins = (entry => {
    return Object.keys(entry).map(key => new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: entry[key].replace('index.js', 'index.html'),
        minify: {
            removeAttributeQuotes: false, // 移除属性的引号
            removeComments: false, // 移除注释
            collapseWhitespace: false, // 折叠空白区域
        },
        chunks: [key],
        inject: true,
    }));
})(entry);

module.exports = {

    // 入口文件
    entry,

    // 出口文件
    output: {
        filename: 'assets/js/[name].[hash:10].js',
        path: resolve(__dirname, '../dist'),
    },

    // 替换路径配置
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src/'),
            'src': resolve(__dirname, '../src/'),
        },
    },

    // loader 配置
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            // // html
            // {
            //     test: /\.html$/,
            //     exclude: /node_modules/,
            // },
            // 图片
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    esModule: false,
                    name: '[name][hash:10].[ext]',
                    outputPath: 'assets/images',
                },
            },
            // 其他文件
            {
                exclude: /\.(css|scss|sass|js|html|png|jpe?g|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:4].[ext]',
                    outputPath: 'assets/media',
                },
            },
        ],
    },

    // 插件
    plugins: [
        ...htmlWebpackPlugins,
    ],

};
