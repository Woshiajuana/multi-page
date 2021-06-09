
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
    resolve,
    generateEntryByPath,
    parseAssetsPath,
    generateHtmlWebpackPluginsByEntry,
} = require('./utils');

const {
    isDevServer,
    isEnvProduction,
    entryRoot,
    assetsRoot,
    assetsPublicPath,
} = require('./config');

const entry = generateEntryByPath(entryRoot);

let webpackConfig = {
    // 模式
    mode: isEnvProduction ? 'production' : 'development',
    // 构建目标
    target: isDevServer ? 'web' : 'browserslist',
    // 入口
    entry,
    // 出口
    output: {
        path: assetsRoot,
        filename: parseAssetsPath('js/[name].[contenthash:8].js'),
        publicPath: assetsPublicPath,
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
                    limit: 10 * 1024,
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


if (isDevServer) {
    // dev-server
    webpackConfig = merge(webpackConfig, {
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
} else {
    const styleUse = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: assetsPublicPath.startsWith('.') ? { publicPath: '../../' } : {},
        },
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            "postcss-preset-env",
                        ],
                    ],
                },
            },
        },
    ];
    webpackConfig = merge(webpackConfig, {
        // loader 配置
        module: {
            rules: [
                // css 样式
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        ...styleUse,
                    ],
                },
                // sass 样式
                {
                    test: /\.s(c|a)ss$/,
                    exclude: /node_modules/,
                    use: [
                        ...styleUse,
                        'sass-loader',
                    ],
                },
            ]
        },
        // 插件
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: parseAssetsPath('css/[name].[contenthash:8].css'),
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        // 定义要拷贝的源目录
                        from: resolve('public'),
                        // 定义要拷贝到的目标目录
                        to: resolve('dist'),
                    },
                ],
            }),
        ],
    });
}

module.exports = webpackConfig;
