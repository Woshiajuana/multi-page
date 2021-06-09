
const path = require('path');
const nodeDir = require('node-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { assetsSubDirectory } = require('./config');

const resolve = dir => path.join(__dirname, '..', dir);

const parseAssetsPath = _path => path.posix.join(assetsSubDirectory, _path);

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
    resolve,
    parseAssetsPath,
    requireFile,
    generateEntryByPath,
    generateHtmlWebpackPluginsByEntry,
};
