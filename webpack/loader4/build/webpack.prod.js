const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    externals: 'lodash',  // 防止自己写的库引用了第三方库，并且又重新引用一次，造成多次引用的问题。所以将lodash忽略
    plugins: [
        new HtmlWebpackPlugin({
			template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
        new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		})
    ],
    output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'library.js',
		library: 'root',
		libraryTarget: 'umd'
	}
}