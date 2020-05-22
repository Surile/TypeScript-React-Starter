const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new ErrorOverlayPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'public/index.html',
        }),
    ],
    output: {
        publicPath: '/',
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        historyApiFallback: true,
        overlay: true,
        compress: true,
        port: 3000,
        hot: true,
    },
})
