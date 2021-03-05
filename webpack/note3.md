从课程[4-1]开始

## Tree Shaking
作用是什么？
引入一个模块的时候，我只引入我需要的代码，不需要的部分不进行打包。

Tree Shaking只支持ES Module（即import语法），我使用了Commonjs的语法没有实现预期效果。

- 在webpack.config.js文件中做以下配置：
```
optimization: {
    usedExports: true
}
```

- 在package.json中配置如下：
```
sideEffects: false,  // 表示打包之后对所有模块都Tree Shaking
sideEffects: [
    "*.css",
    "@babel/polyfill"
],  // 表示除了css文件和"@babel/polyfill"之外，其余文件打包都是Tree Shaking
```
在`mode:production`的时候才会生效。


## development模式和production模式的打包
项目代码：loader3

安装插件：
```
yarn add webpack-merge@4.1.5 -D
```

分离出配置文件`webpack.default.js`、`webpack.dev.js`、`webpack.prod.js`，并且使用es6 Module语法，将打包的代码tree shaking。



## webpack和code spliting
项目代码：loader3

1、在将webpack配置放到build目录之后，配置的一些目录结构也要修改。
```
plugins: {
    new CleanWebpackPlugin(['dist'],{
+     root: path.resolve(__dirname, '..') // 设置更目录为项目的根目录
    })
},
output: {
     filename: '[name].js',
+    path: path.resolve(__dirname, '../dist')
}
```

Code Spliting：代码分割。
首先代码分割，和webpack无关。没有webpack，同样可以做代码分割。而因为webpack和内置了代码分割，所以我们常说代码分割的时候都会和webpack联系起来。

执行`npm run dev_build`

在webpack中实现代码分割，有两种方式：
- 1、同步代码：只需要在webpack.dev.js中做`optimization:{splitChunks: { chunks: "all" }}`的配置，即可分割同步代码。
- 2、异步代码（import）:这种情况不需要做任何配置，会自动进行代码分割，放置到新的文件中。

在这个例子中对于异步代码需要安装一个插件：
`yarn add @babel/plugin-syntax-dynamic-import@7.2.0 -D `用来兼容import异步引入插件语法不支持的问题。
并且可以做魔法注释配置:
```
return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {...})
```
并在webpack.default.js中做配置
```
splitChunks: {
    chunks: 'all',  
    cacheGroups: {
        vendors: false,
        default: false
    }
}
```
执行`npm run dev_build`之后，就能实现打包的dist文件中以`lodash.js`为文件名单独搞出来了。

## SplitChunksPlugin
目的是用来进行公共模块抽取。

修改webpack.default.js中配置。在下面备注了各个属性代表的意思：
```
optimization: {
    usedExports: true,
    splitChunks: {   // 代码分割配置
        chunks: 'all',  // 指同步代码和异步代码都进行代码分割，默认是async
        minSize: 30000, // 大于30k时，会进行打包;
        minChunks: 1,  // 打包之后的chunk文件中，被使用一次及以上则分割
        maxAsyncRequests: 5, // 按需加载块时的并行请求的数量小于等于5（用默认的即可）
        maxInitialRequests: 3, // 初始页面加载时并行请求的最大数量小于等于3（用默认的即可）
        automaticNameDelimiter: '~', // 文件名分割符
        name: true,
        cacheGroups: {  // 缓存组（抽取公共模块的主要配置都在这里）
            vendors: {  // 匹配打包node_modules中的第三方依赖
                test: /[\\/]node_modules[\\/]/,
                priority: -10,  // 因为这块的值大于default部分的，所以会先匹配vendors模块。
                filename: 'vendors.js',  // 所有符合条件的都打包进vendors.js文件中
            },
            default: { // 匹配所有插件
                priority: -20,  // 设置匹配的优先级，数值越大，越优先匹配（这里是负值）
                reuseExistingChunk: true, // 多个插件之间相互引用时，如果某插件a已存在，则不会对他进行二次打包
                filename: 'common.js' // 将打包文件全部汇总到common.js中
            }
        }
    }
}
```

- SplitChunksPlugin讲解资料：
https://v4.webpack.js.org/plugins/split-chunks-plugin/



## Lazy Loading懒加载，Chunk是什么？
- Lazy Loading懒加载：只有在需要用到该插件的时候，才会开始下载。一般是由import这个方法来实现的。如：import('./lodash.js')是返回一个Promise对象。
- Chunk：打包之后的dist文件中，每一个文件都是一个Chunk.

 
## 打包分析，Preloading和Prefetching
进入浏览器的console模块中，按住`command+shift+p`，然后筛选出`show coverage`，刷新，就能看到这个网站的代码利用率了。

建议多写一些异步代码，提升首屏加载速度。


- Prefetching：在页面加载的过程中，等主文件都加载完成后的时间间隔中，会预先把需要的文件下载下来；等到用到的时候再读取缓存。
- Preloading：跟Prefetching作用类似，但是Preloading的下载会跟主文件同时下载。

```
// selfModules/click.js
function handleClick(){
    const ele = document.createElement('div')
    ele.innerText = '我是李钟'
    document.body.appendChild(ele)
}

export default handleClick


index.js
// 异步调用的方法，并使用魔法注释的方式异步加载
document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */ './selfModules/click.js').then(({default: func}) => {
        func()
    })
})
```



## 对css文件进行文件切割
https://webpack.js.org/plugins/mini-css-extract-plugin/

- 先安装两个插件：
```
yarn add mini-css-extract-plugin@0.5.0 -D
yarn add optimize-css-assets-webpack-plugin@5.0.1 -D
```

- 在webpack.prod.js中做如下配置：
```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

将module中的scss和css匹配更换如下：即将style-loader更换成MiniCssExtractPlugin.loader。并在optimization和plugins上做配置。
rules:[{
    test: /\.scss$/,
    use: [
-        'style-loader'
+        MiniCssExtractPlugin.loader, 
        {...}
    ]
},{
    test: /\.css$/,
    use: [
-        'style-loader'
+        MiniCssExtractPlugin.loader, 
        'css-loader',
    ]
}]

+   optimization: {
+       minimizer: [new OptimizeCSSAssetsPlugin({})]  // 做css的合并
+   },
+   plugins: [
+       new MiniCssExtractPlugin({  // tree shaking的css分割，所有css合并到一个文件夹中
+           filename: '[name].css',
+           chunkFilename: '[name].chunk.css'
+      })
+   ]
```

然后执行`npm run build`，就能看到合并之后的main.css了





## webpack和浏览器缓存
目的是：每次打包之后如果代码没有修改每次打包都是一样的hash值；如果业务代码修改了，那么就是main.js的hash值变化，而vendor或者1.js的hash值不变(第三方的插件代码)

webpack.config.js作如下配置，能够不提示打包文件过大，需性能优化上的提示。
```
performance:false
```

线上打包的[contenthash]配置，能达成只要代码不变化，生成的文件hash值就是一样的。
```
output: {  // 为了代码修改后，每一次打包都会生成新的hash
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
}
```

有一些文件没有修改，打包后文件的hash也不一样，这个时候就要添加这个配置了，就能起到相同的代码打包后的hash相同的问题：
```
optimization: {
+    runtimeChunk: {
+        name: 'runtime'
+    }
}
```


## Shimming（垫片）
其实在guides/shimming及其之前的文档都应该好好的认真读一遍。

场景1：
我在一个文件a中引入jquery，那么此时在文件a中可以使用jquery，但是在文档b中却不能使用。现在我想达到一个在全局都能使用jquery的目的，怎么配置？

ProvidePlugin是webpack内置的一个方法。以下修改都在webpack.default.js中修改。
```
plugins: [
+    new webpack.ProvidePlugin({
+        _: 'lodash',   //这样配置就能在全局使用_(lodash)
+        _join: ['lodash', 'join']  // 这样就能在全局直接使用lodash的_join方法
+    }),
]
```

场景2：默认情况下模块的this是指向当前模块的，但是你现在想要强制让this指向window，如何配置？

安装一个插件
```
yarn add imports-loader@0.8.0 -D
```
然后进行配置如下：
```
module: {
    rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader'
+        }, {
+            loader: 'imports-loader?this=>window'
+        }]
    }]
}
```

然后在index.js中写入代码测试上述两个场景代码：
```
console.log('>>>>result', _.join(['a', 'b', 'c'], '~'))
console.log('>>>>单独_join', _join(['b', 'b', 'a'], '宝马奔驰'))
console.log('this>>>', this === window)
```



- 参考资料：
https://v4.webpack.js.org/guides/shimming/



## 如何在打包的时候使用全局变量
```
package.json
"scripts": {
    "dev_build": "webpack --config ./build/webpack.default.js",
    "dev": "webpack-dev-server --config ./build/webpack.default.js",
    "build": "webpack --env.production --config ./build/webpack.default.js",
    "self": "webpack --env.production=abc --config ./build/webpack.default.js",
},


将webpack.dev.js和webpack.prod.js文件的merge去掉
-   const merge = require('webpack-merge')
-   module.exports = merge(commonConfig, devConfig)

在webpack.default.js增加代码
module.exports = (env) => {
    // 设置三种情况
	if(env && env.production) {
		return merge(commonConfig, prodConfig);
	}else if(env && env.production==='abc'){
		return merge(commonConfig, prodConfig);
	}else{
        return merge(commonConfig, devConfig);
    }
}
```

