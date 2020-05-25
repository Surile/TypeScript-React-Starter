const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const common = require('./webpack.common')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')

const postCSSLoaderOptions = {
    ident: 'postcss',
    plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
            flexbox: 'no-2009',
        }),
    ],
}

module.exports = merge(common, {
    dependencies: ['vendor'],
    devtool: 'source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: true,
                        },
                    },
                    'sass-loader',
                    {
                        loader: require.resolve('postcss-loader'),
                        options: postCSSLoaderOptions,
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: require.resolve('postcss-loader'),
                        options: postCSSLoaderOptions,
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['build']}),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, 'dll/manifest.json'),
        }),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: 'public/index.html',
        }),

        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, './dll/vendor**.js'),
            includeSourcemap: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css',
        }),
    ],
    output: {
        publicPath: '',
    },
    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all',
                },
                styles: {
                    name: 'styles',
                    test: /\.(c|le|sa|sc)ss$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
})
