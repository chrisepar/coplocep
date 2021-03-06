const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
   },
   devServer: {
      inline: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
             test: /\.css$/i,
             use: ['style-loader', 'css-loader'],
         },
         {
             test: /\.(png|svg|jpg|jpeg|gif)$/i,
             type: 'asset/resource',
         },
         {
             test: /\.(woff|woff2|eot|ttf|otf)$/i,
             type: 'asset/resource',
         },
         {
             test: /\.(csv|tsv)$/i,
             use: ['csv-loader'],
         },
         {
             test: /\.xml$/i,
             use: ['xml-loader'],
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}