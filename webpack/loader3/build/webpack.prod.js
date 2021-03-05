const path = require('path');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.default.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const prodConfig = {
	mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
		rules: [{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, 
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
				MiniCssExtractPlugin.loader, 
				'css-loader',
				// 'postcss-loader'
			]
        }] 
    },
    optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',   // 直接引入
			chunkFilename: '[name].chunk.css'   // 间接引入
		})
    ],
    output: {  // 为了代码修改后，每一次打包都会生成新的hash
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '../dist')
	}
}

module.exports = merge(commonConfig, prodConfig)