const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
    return {
        mode: 'development',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
        //     historyApiFallback: true,
        //     open: true,
        //     // clientLogLevel: 'silent',
        //     port: 8080,
        //     hot: true,
        //     proxy: {
        //         '/coplocep': {
        //             target: "http://localhost:8081/"
        //         }
        //     }
        },
        devtool: 'inline-source-map',
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
            new HtmlWebpackPlugin({
                title: 'Development',
            }),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            // new webpack.HotModuleReplacementPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules|packages/,
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