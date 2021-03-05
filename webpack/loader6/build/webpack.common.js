const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

// 生成plugins文件
const makePlugins = (configs) => {
    const keys = Object.keys(configs.entry)
    const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
    let plugins = [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        })
    ];
    console.log('keys>>>>', keys)
    keys.forEach(item => {
        plugins.push(
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                filename: `${item}.html`,
                chunks: ['runtime', 'vendors', item]  // 需要引入的js文件
            })
        )
    })

    
    files.forEach(file => {
        if(/.*\.dll.js/.test(file)) {
            plugins.push(new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(__dirname, '../dll', file)
            }))
        }
        if(/.*\.manifest.json/.test(file)) {
            plugins.push(new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, '../dll', file)
            }))
        }
    })
    return plugins;
}
// 入口文件
let entryObj = {};
const entryFiles = fs.readdirSync(path.resolve(__dirname, '../src'));
const filterFiles = entryFiles.filter(e => e.includes('.js'))
filterFiles.forEach(file => {
    const fileName = file.split('.js')[0]
    entryObj[fileName] = `./src/${file}`
})
// 配置
let configs = {
	entry: entryObj,
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [{ 
			test: /\.jsx?$/, 
			include: path.resolve(__dirname, '../src'),
			use: [{
				loader: 'babel-loader'
			}]
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
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors',
                }
            }
        }
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist')
	}
}

configs.plugins = makePlugins(configs);
console.log('>>>>configs', configs)
module.exports = configs




