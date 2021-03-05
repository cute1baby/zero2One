const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.default.js');

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    
    module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				// 'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				// 'postcss-loader'
			]
        }]
    },
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
    ],
    output: {  // 开发代码没有必要生成hash
        filename: '[name].js',
        chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}

module.exports = merge(commonConfig, devConfig)