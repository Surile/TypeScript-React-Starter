const path = require('path')
const WebpackBar = require('webpackbar')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const DotenvFlow = require('dotenv-flow-webpack')

module.exports = {
    entry: './src/main.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            // 'react-dom': '@hot-loader/react-dom',
            '@/': path.resolve(__dirname, 'src'),
            '@/components': path.resolve(__dirname, 'src/components'),
            '@/pages': path.resolve(__dirname, 'src/pages'),
            '@/utils': path.resolve(__dirname, 'src/utils'),
            '@/api': path.resolve(__dirname, 'src/api'),
            '@/asset': path.resolve(__dirname, 'src/asset'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    plugins: [
        new WebpackBar({
            name: 'react-typescript-boilerplate',
            color: '#1890ff',
        }),
        new FriendlyErrorsPlugin(),
        new CleanWebpackPlugin(),
        new DotenvFlow({
            default_node_env: 'development',
        }),
    ],
}
