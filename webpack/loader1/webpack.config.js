// 基础配置
const path = require('path')
module.exports = {
    mode: 'production',  // 配置可以为development(代码不压缩) | production
    // entry: './src/index.js',  简写方法
    entry: {
        'main': './src/index.js',
    },
    module: {
        rules: [
            // {  // 识别图片模块的loader
            //     test: /\.(png|jpe?g|gif)$/i,
            //     use: [
            //         {  
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name]_[hash].[ext]',  // 打包后的文件名name和后缀ext不变
            //                 outputPath: 'images',    // 配置路径
            //             }
            //         }
            //     ]
            // },
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
            {  // 打包css文件的loader
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
            },
        ]
    },
    output: {
        filename: 'bundle.js',  // 打包后的文件名
        path: path.resolve(__dirname, 'dist')  //配置文件路径
    }
}