
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolveFilename = require('art-template/lib/compile/adapter/resolve-filename');
const CompressionPlugin = require('compression-webpack-plugin');

const {
    resolve,
    generateEntryByPath,
    parseAssetsPath,
    generateHtmlWebpackPluginsByEntry,
} = require('./utils');

const {
    isDevServer,
    isEnvProduction,
    useCompress,
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
                options: {
                    "presets": [
                        [
                            "@babel/preset-react",
                        ],
                        [
                            "@babel/preset-env",
                            {
                                "useBuiltIns": "usage",
                                "corejs": {
                                    "version": 3
                                },
                                "targets": {
                                    "chrome": "60",
                                    "firefox": "60",
                                    "ie": "9",
                                    "safari": "10",
                                    "edge": "17"
                                }
                            }
                        ],
                    ]
                }
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
            // art html
            {
                test: /\.art$/,
                exclude: /node_modules/,
                loader: resolve('build/art-template-loader'),
                options: {
                    resolveFilename (path, context) {
                        /^src/.test(path) && (path = path.replace(/^src/, resolve('src')));
                        return resolveFilename(path, context);
                    },
                    // 扩展出来，排除一些不需要的 js 资源引入
                    exclude: [
                        /flexible.js$/,
                    ],
                }
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
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                // scss 样式
                {
                    test: /\.s(c|a)ss$/,
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
    const plugins = [
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
    ];
    if (useCompress) {
        plugins.push(new CompressionPlugin({
            filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: 'gzip', // 算法
            test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
            threshold: 10240, // 只处理比这个值大的资源。按字节计算
            minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
        }));
    }
    webpackConfig = merge(webpackConfig, {
        // loader 配置
        module: {
            rules: [
                // css 样式
                {
                    test: /\.css$/,
                    use: [
                        ...styleUse,
                    ],
                },
                // sass 样式
                {
                    test: /\.s(c|a)ss$/,
                    use: [
                        ...styleUse,
                        'sass-loader',
                    ],
                },
            ]
        },
        // 插件
        plugins,
    });

}

module.exports = webpackConfig;
