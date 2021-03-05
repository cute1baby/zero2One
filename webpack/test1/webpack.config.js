// 基础配置
const path = require('path')
module.exports = {
    mode: 'production',  // 配置可以为development(代码不压缩) | production
    // entry: './src/index.js',  简写方法
    entry: {
        'main': './src/index.js',
    },
    output: {
        filename: 'bundle.js',  // 打包后的文件名
        path: path.resolve(__dirname, 'dist')  //配置文件路径
    }
}