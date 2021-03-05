
## source-map配置
进入documentation > configuration模块，进入：https://v4.webpack.js.org/configuration/devtool/，这里有对应的配置。不同的配置会影响代码的打包速度，文档中有标明。

解决的问题是什么？
当打包的代码出错的时候，给源代码和目标生成代码之间做一个映射，更好地定位在源代码上的报错位置。

配置如下：
```
{
    mode: 'development',
    devtool: 'source-map',  // 打包之后报错部分，能定位到源代码在多少行
}
```

最佳实践：
- 如果是development环境，那么建议devtool使用：cheap-module-eval-source-map模式。
- 如果是production环境，那么建议使用：cheap-module-source-map来定位问题。【我测试了一下，效果并不是很好】


## webpack-dev-server
我们在开发项目的时候，修改一点东西就打包会很麻烦，是否可以使用一种实时打包的方式。在package.json中有下面几种配置方式：
```
"watch": "webpack --watch"
"dev": "webpack-dev-server",
"server": "node server.js"
```

对于第三种方法：我们通过express和webpack-dev-middleware建立一个小型服务器，达到实时刷新的效果。具体见代码server.js。
这种方式安装了两个插件：webpack-dev-middleware@3.4.0  express@4.16.4


webpack在命令行中的使用大全：https://v4.webpack.js.org/api/cli/
webpack在node中的使用大全：https://v4.webpack.js.org/api/node/


## Hot Module Replacement
能实现：只会替换修改的文件，不会刷新页面。

- 方法1：在package.json中做如下配置能达到同样的效果：
```
"scripts": {
    "dev": "webpack-dev-server --hot"
}
```
即在`webpack`或者`webpack-dev-server`后面加上`--hot`的命令。

- 方法2
    - 1、在webpack.config.js中引入webpack: const webpack = require('webpack');
    - 2、在plugin中配置插件：
    ```
    devServer: {
        hot: true,  // 配置这个会默认的在修改完代码之后自动的刷新一次
        hotOnly: true  // 配置这个后会识别`if(module.hot)`代码不刷新，其余的都刷新
    },
    plugins: {
        new webpack.HotModuleReplacementPlugin()
    }
    ```
    - 3、在`src/index.js`中做如下配置：
    ```
    // 只要`./createNumber`发生变化，就会重新执行createNumber函数
    if(module.hot) {
        module.hot.accept('./createNumber', () => {
            document.body.removeChild(document.getElementById('pDom'));
            createNumber();
        })
    }
    ```
    市场上常用的webpack插件中，基本都会内置这种配置（即修改文件后默认自动刷新）；第三部分这里，是在遇见特殊文件或者特殊情况下需要自己手写自动刷新时，需要手动加上这些方法。


只要`./number`发生变化，就会重新执行number函数

- 参考资料：
https://v4.webpack.js.org/guides/hot-module-replacement/  文档方法
https://v4.webpack.js.org/api/hot-module-replacement/  配置方法
https://v4.webpack.js.org/concepts/hot-module-replacement/  html,webpack的底层实现原理


## babel功能
例子见`loader2`。

这一部分的配置可以参照：`webpack基础知识点/1webpack(三水清)/08专讲babel.md`。

### babel官网的一些资料参考
- https://babeljs.io/docs/en/usage    Usage guide，讲解了一些配置的方式
- https://babeljs.io/docs/en/babel-plugin-transform-runtime
Usage / transform-runtime模块


## 配置react代码的打包
例子没写。
安装插件：
```
npm install react react-dom -S   // 安装react编写的必要插件
npm install --save-dev @babel/preset-react  // 打包编译react的插件
```

在`webpack.config.js`进行babel的文件配置：
```
use: {
    loader: 'babel-loader',
    options: {
        presets: [
            ['@babel/preset-env', {
                targets: {
                    chrome: "67",
                },
                useBuiltIns: 'usage'
            }],
            "@babel/preset-react"
        ]
    }
}
```

### 参考资料
- https://babeljs.io/docs/en/babel-preset-react  Presets/react





