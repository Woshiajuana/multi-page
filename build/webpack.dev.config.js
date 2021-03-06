
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve, parseAssetsPath } = require('./utils');
const { assetsPublicPath } = require('./config');

// 基础配置
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {

    // 模式
    target: 'web',

    // loader 配置
    module: {
        rules: [
            // css 样式
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
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
                ],
            },
            // sass 样式
            {
                test: /\.s(c|a)ss$/,
                exclude: /node_modules/,
                use: [
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

    // 拆分 分包
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         minSize: 1 * 1, // 分割 chunk 最小为 kb
    //         maxSize: 0, // 最大没有限制
    //         minChunks: 1, // 要提取的 chunk 最少被引用一次
    //         maxAsyncRequests: 5, // 按需加载时并行加载的文件最大数
    //         maxInitialRequests: 3, // 入口 js 文件最大并行数量
    //         automaticNameDelimiter: '~', // 名称连接符
    //         name: true,
    //         cacheGroups: {
    //             // 分割 chunk 的组
    //             // node_modules 文件会被打包到 vendors 组的 chunk 中 `vendors~xxx.js`
    //             // 需要满足上面的规则
    //             vendors: {
    //                 name: 'vendors',
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10,  // 优先级
    //             },
    //             commons: {
    //                 // 要提取的 chunk 最少被引用 2次
    //                 name: 'commons',
    //                 minChunks: 2,
    //                 priority: -10,  // 优先级
    //                 // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会被复用
    //                 reuseExistingChunk: true,
    //             }
    //         }
    //     }
    // },

});
