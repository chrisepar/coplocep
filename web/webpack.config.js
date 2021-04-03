const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [path.resolve(__dirname, 'src', 'index.js'), 'webpack-hot-middleware/client'],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: "[name].js",
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    resolve: {
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules'
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', "!web.config", "!index.html"],
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules|packages/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/react'
                        ],
                        plugins: [
                            "react-hot-loader/babel",
                            "transform-class-properties"
                        ]
                    }
                }]
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            }
        ],
    }
};