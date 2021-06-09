
const path = require('path');
const nodeDir = require('node-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 遍历文件目录
function requireFile (directory = '', recursive, regExp) {
    if (directory[0] === '.') {
        // Relative path
        directory = path.join(__dirname, directory)
    } else if (!path.isAbsolute(directory)) {
        // Module path
        directory = require.resolve(directory)
    }
    return nodeDir
        .files(directory, {
            sync: true,
            recursive: recursive || false
        })
        .filter((file) =>  {
            return file.match(regExp || /\.(json|js)$/)
        });
}

// 生成入口
function generateEntryByPath (directory) {
    let entry = {};
    requireFile(
        directory,
        true,
        /\.js$/,
    ).forEach((file) => {
        const keyArr = path.join('.', file.slice(directory.length + 1))
            .split(path.sep);
        const key = keyArr
            .slice(0, keyArr.length - 1)
            .join('_');
        entry[key] = file;
    });
    return entry;
}

// 生成多入口模板 Html 文件插件
function generateHtmlWebpackPluginsByEntry (entry) {
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
}

module.exports = {
    requireFile,
    generateEntryByPath,
    generateHtmlWebpackPluginsByEntry,
};
