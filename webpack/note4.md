## 自己写一个插件
例子见loader4

打包之后的dist文件生成`library.js`，新建一个`index.html`文件并引入该`library.js`，此时在页面中打开输入root，就是这个包暴露出来的结果
```
var {math, string} = root.default
math.add(1,5)  // 6
```

另外这里还需要注意的配置是：
```
externals: 'lodash',  // 防止自己写的库引用了第三方库，并且又重新引用一次，造成多次引用的问题。所以将lodash忽略
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'root',  // 向外暴露的变量名
    libraryTarget: 'umd'
}
```
可以对比一下配置了externals和没有配置externals时，打包出来的library的体积大小。


### 如何发布一个npm包
- 1、去npm官网注册账号
- 2、账号登录
    - 将注册账号的用户名、密码和邮箱，使用npm login的方式
- 3、将包发布到npm服务器
```
npm publish
```

如何更新之前发布的包
1、npm version patch，将当前版本在之前的版本上加1
2、npm publish上传最新代码


## 打包实现pwa
- 什么是pwa?
用户访问了一次页面之后，会在用户的本地缓存下来。下次访问出现断网或者服务器挂掉的时候也能正常显示。

- 安装两个插件
```
// 一个服务器包http-server
// 实现pwa处理workbox-webpack-plugin
yarn add http-server@0.11.1 workbox-webpack-plugin@3.6.3 -D
```

- 配置
```
plugins: [
+    new WorkboxPlugin.GenerateSW({
+        clientsClaim: true,
+        skipWaiting: true
+    })
],
```

- 在业务代码中调用
```
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then(registration => {
				console.log('service-worker registed');
			}).catch(error => {
				console.log('service-worker register error');
			})
	})
}
```

- 重新打包，生成缓存文件(试了，生效)
主要起缓存作用的是`precache-manifest.**.js`和`service-worker.js`这两个文件。打包之后将打包的文件放在我们通过http-server启动的服务，然后关掉服务，仍然可以看到之前访问的网页能继续访问。

中间的一些小插曲：
开始的时候没有装`html-webpack-plugin`和`clean-webpack-plugin`，在dist文件下下面的index.html是自己手动添加上去的，所以一直没有生效；后面使用了这两个插件，自动会引用src/index.html文件，添加上相应的js文件，就生效了

清除serviceWorker，在浏览器工具的`application`的`service workers`中，将对应的所有模块都点击`Unregister`,那么缓存就清除了。


## proxy配置
只能在`mode: development`情况下才能生效
{
    proxy: {
        '/react/api': {
            target: 'https://www.dell-lee.com',  //代理的目标域名
            secure: false,  // 代理https的请求地址
            pathRewrite: {  
                '^/api' : ''  // 路径的重写
            },
            changeOrigin: true,  // 修改origin的，让更多域名可以调用接口
            headers: {  // 编辑头信息，对于登录的cookies和鉴权等配置的设置
                host: 'www.dell-lee.com',
                cookie: 'abcdfw'
            }
        }
    }
}


## 单页面路由问题
只能在`mode: development`情况下才能生效。做如下配置

默认情况下：我们写的路由`/list`，其实默认情况下会向服务器请求list这样一个页面；做了如下配置之后，我们写得所有路由，最终都会请求`index.html`文件。
```
devServer: {  // 实现单页面路由
    historyApiFallback: true
}
```



## eslint配置(效果不佳，没什么软用，推荐在项目中使用eslint，这部分要补补课)
见项目loader4
- 1、在vscode编辑器中下载`eslint`插件，并在setting.json中进行配置
```
//配置eslint
"editor.codeActionsOnSave": {
    "source.fixAll": true
}

```
- 2、在项目中安装eslint的包
```
yarn add eslint@5.16.0 -D

npx eslint --init(按照自己的选择选下去)
    use a popular style guide
    Airbnb| standrd   // 选择规范
    是否使用react   // no
    javascript    // 对javascript语法进行规范约束
    是否想要升级    // 是
    是否要安装相应的npm包   // 是
```

- 3、在配置文件中进行配置
yarn add babel-eslint@10.0.1 -D
配置parser
```
// .eslintrc.js
module.exports = {
    "extends": "airbnb-base",
+   "parser": "babel-eslint",
};
```

- 4、检查src下的js代码
```
npx eslint src
```


### 在webpack中配置eslint
```
yarn add eslint-loader@2.1.1 -D

配置如下：
module: {
    rules: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: [
            { loader: 'babel-loader' },
+           { loader: 'eslint-loader' }
        ]
    }]
},
```


## 性能优化

### 提升打包速度
- 1、跟上技术迭代，升级npm,node版本
- 2、尽可能少的模块使用loader，如使用exclude排除node_modules
- 3、plugin尽可能精简且可靠


### 简写方式
一些配置，要配置精简一些。
```
resolve: {
    extensions: ['.js', '.jsx'],  // 没写后缀会默认去找带这样后缀的文件
    mainFiles: ['index', 'child']  // 只写文件夹会默认去找该文件夹下的index和child文件
    alias: {  // 取别名
        delllee: path.resolve(__dirname, '../src/child')
    }
}
```

### 使用DllPlugin提高打包速度
例子见文件loader5

思路：将所有的第三方组件都打包到一个dll文件中，因为第三方组件一般变化都比较小，所以在第一次加载后都可以缓存进来，之后便可以直接使用。

- 创建文件webpack.dll.js，在打包之后生成以插件命名的几个第三方插件
```
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		vendors: ['lodash'],
		react: ['react', 'react-dom'],
		jquery: ['jquery']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]'
	},
	plugins: [
        // 目的是生成mainfest.json文件，与第三方插件之间做一个映射关系。
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json')
		})
	]
}
```

- 安装插件
```
yarn add add-asset-html-webpack-plugin --save
```

- 在webpack.common.js文件中引入AddAssetHtmlWebpackPlugin
目的是将dll文件夹下打包的文件被dist/index.html文件使用。
```
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

let plugins = [
	new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), 
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	})
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
	if(/.*\.dll.js/.test(file)) {
		plugins.push(new AddAssetHtmlWebpackPlugin({
			filepath: path.resolve(__dirname, '../dll', file)
		}))
	}
    // 配置mainfest.json映射文件
	if(/.*\.manifest.json/.test(file)) {
		plugins.push(new webpack.DllReferencePlugin({
			manifest: path.resolve(__dirname, '../dll', file)
		}))
	}
})

```

- 执行命令
```
// 生成第三方组件打包文件dll/*
npm run build:dll

// npm run build
查看index.html引入的js文件
```


### 控制包的大小
- 1、通过配置tree shaking只对使用的包进行压缩合并
- 2、通过Code spliting的方式进行代码分割


### 提升打包速度（了解为主）
- 3、thread-loader,parallel-webpack,happypack等进行多进程打包
- 4、合理的使用sourceMap
- 5、结合stats分析打包结果
- 6、开发环境内存编译，开发环境无用插件剔除（如开发环境不用做代码压缩这些）





