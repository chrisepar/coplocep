const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
    return {
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'build'),
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            historyApiFallback: true,
            open: true,
            clientLogLevel: 'silent',
            port: 9000,
            hot: true
        },
        resolve: {
            modules: [
                path.resolve(__dirname, './src'),
                'node_modules'
            ]
        },
        // optimization: {
        //     splitChunks: {
        //         chunks: 'all',
        //     },
        // },
        plugins: [
            // new CleanWebpackPlugin(),
            // new HtmlWebpackPlugin({
            //     title: 'Development',
            // }),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": "defaults"
                                }],
                                '@babel/preset-react'
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
};