const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          },
          {
            test: /\.js$/,
            enforce: 'pre',  // 设置执行顺序，pre优先处理，post 最后处理
            exclude: /node_modules/,
            use: 'eslint-loader'
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
			template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, './')
        }),
        new webpack.HotModuleReplacementPlugin() 
    ],
    devServer: {
        port: 8080,
        hot: true
    }
}