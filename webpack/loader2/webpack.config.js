// 基础配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack');

module.exports = {
    mode: 'development',  // 配置可以为development(代码不压缩) | production
    // entry: './src/index.js',  简写方法
    entry: {
        'main': './src/index.js',
    },
    // devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {  // 识别图片模块的loader
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {  
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash].[ext]',  // 打包后的文件名name和后缀ext不变
                            outputPath: 'images',    // 配置路径
                            limit: 10240    // 小于10k才会生效
                        }
                    }
                ]
            },
            {  // 用file-loader将图标文字给解析
                test: /\.(eot|woff2|woff|ttf|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // name: '[path][name].[ext]',
                        publicPath: 'assets/'
                    }
                }]
            },
            {  // 打包css文件的loader
                test: /\.less$/i,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader', 
                        options: {
                            importLoaders: 2,  // 指通过import语法引入的less文件，也会先走下面2个loader，才会走css-loader
                            // modules: true,  // 开启css模块化（即css私有性）
                        }
                    },
                    'less-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: 
                        }
                        autoprefixer
                    }
                    
                ],
            },
            {  // 将语法转化为es5
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                chrome: "67",
                            },
                            useBuiltIns: 'usage'
                        }]
                    ]
                  }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),   // 表示清除的是dist打包文件
        new webpack.HotModuleReplacementPlugin()  // 热跟新加载；好像不生效，还是会刷新
    ],
    output: {
        filename: 'bundle.js',  // 打包后的文件名
        path: path.resolve(__dirname, 'dist')  //配置文件路径
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8082,
        hot: true,
        hotOnly: true  // 当html出了问题，webpack-dev-server会重新刷新页面；配置了这个参数，就不会刷新页面。
    }
}