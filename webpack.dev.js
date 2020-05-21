const merge = require('webpack-merge')
const common = require('./webpack.common')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = merge(common, {
    dev: 'inline-source-map',
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
    },
    output: {publicPath: '/'},
    plugins: [new ErrorOverlayPlugin()],
})
