const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: [
                { loader: 'babel-loader' },
                { loader: 'imports-loader?this=>window' }
            ]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname, '..')  // 设置更目录为项目的根目录
        }),
        new webpack.ProvidePlugin({
			_: 'lodash',
			_join: ['lodash', 'join']
		})
    ],
    optimization: {
        usedExports: true,
        // splitChunks: {   // 代码分割配置
        //     chunks: 'all',  // 指同步代码和异步代码都进行代码分割
        //     minSize: 30000, // 大于30k时，会进行打包;
        //     minChunks: 1,  // 在文件中被使用一次及以上就会分割
        //     maxAsyncRequests: 5, // 同时异步发出的请求数为5个（用默认的即可）
        //     maxInitialRequests: 3, // 页面最大并行请求数（用默认的即可）
        //     automaticNameDelimiter: '~', // 文件名分割符
        //     name: true,
        //     cacheGroups: {
        //       vendors: {  // 匹配打包node_modules中的第三方依赖
        //         test: /[\\/]node_modules[\\/]/,
        //         priority: -10,
        //         filename: 'vendors.js',  // 所有符合条件的都打包进vendors.js文件中
        //       },
        //       default: { // 匹配所有插件
        //         priority: -20,  // 设置匹配的优先级，数值越大，越优先匹配（这里是负值）
        //         reuseExistingChunk: true, // 多个插件之间相互引用时，如果某插件a已存在，则不会对他进行二次打包
        //         filename: 'common.js' // 将打包文件全部汇总到common.js中
        //       }
        //     }
        // },
        splitChunks: {
            chunks: 'all',  
            cacheGroups: {
                vendors: false,
                default: false
            }
        }
	}
}