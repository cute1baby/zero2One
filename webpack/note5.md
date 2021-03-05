## 多页面项目打包
项目在loader6

思路：主要设置入口文件entry为多页面，plugins中根据入口文件生成对应的html文件（用HtmlWebpackPlugin生成）。

webpack.common.js主要代码：
```
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
    ...
}

// 将plugins属性挂载到configs
configs.plugins = makePlugins(configs);
module.exports = configs
```