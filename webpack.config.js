const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
// const WebpackObjLoader = require('webpack-obj-loader');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/models", to: "models" },
      ],
    }),
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }
    ],
  },
  devServer: {
    open: true,
    hot: true,
    port: 8084,
    watchFiles: ['./index.html', './src/*', './dist/*']
  },
};