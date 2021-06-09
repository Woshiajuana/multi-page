
const {
    resolve,
    isEnvProduction,
    generateEntryByPath,
    parseAssetsPath,
    generateHtmlWebpackPluginsByEntry,
} = require('./utils');

const {
    entryRoot,
    assetsRoot,
} = require('./config');

const entry = generateEntryByPath(entryRoot);

module.exports = {

    // 模式
    mode: isEnvProduction ? 'production' : 'development',

    // 构建目标
    target: 'browserslist',

    // 入口
    entry,

    // 出口
    output: {
        path: assetsRoot,
        filename: `[name].[contenthash:8].js`,
    },

    // 解析
    resolve: {
        alias: {
            '@': resolve('src'),
            'src': resolve('src'),
        },
        extensions: [
            '.js',
            '.ts',
            '.vue',
            '.jsx',
            '.json'
        ],
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
            // html
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
                options: {
                    esModule: false,
                },
            },
            // 图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    esModule: false,
                    name: parseAssetsPath('images/[name].[hash:8].[ext]'),
                },
            },
            // 字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: parseAssetsPath('fonts/[name].[hash:8].[ext]')
                },
            },
            // 媒体文件
            {
                test: /\.(mp3|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: parseAssetsPath('media/[name].[hash:8].[ext]')
                }
            },
        ]
    },

    // 插件
    plugins: [
        ...generateHtmlWebpackPluginsByEntry(entry),
    ],

};
