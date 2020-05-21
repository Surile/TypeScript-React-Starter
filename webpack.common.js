const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ROOT = path.resolve(__dirname)

module.exports = {
    entry: './src/main.tsx',
    resolve: {
        alias: {
            // 'react-dom': '@hot-loader/react-dom',
            '@': ROOT + '/src',
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Morecycle',
            template: 'public/index.html',
        }),
    ],
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                include: [path.resolve('src')],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: '/.css$/',
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: "'css-loader'",
                    },
                ],
            },
            {
                test: '/.scss$/',
                use: [
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {loader: 'style-loader'},
                ],
            },
            // {
            //     test: '/.less&/',
            //     use: [
            //         'style-loader',
            //         "css-loader",
            //         {
            //             loader: 'less-loader',
            //             options: {
            //                 lessOptions: {
            //                     javascriptEnabled: true,
            //                     modifyVars: theme,
            //                 },
            //             },
            //         },
            //     ],
            // },
            {
                test: '/.(png|svg|jpg|gif)$/',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 1024 * 20,
                        },
                    },
                ],
            },
            {
                test: '/.(woff|woff2|eot|ttf|otf)$/',
                use: ['file-loader'],
            },
        ],
    },
}
