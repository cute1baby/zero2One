
## 项目文件顺序
|- test1
|- loader1
|- loader2


## webpack解决了什么问题？
- 第一阶段
Grunt、Gulp 这类构建工具，打包的思路是：遍历源文件→匹配规则→打包，这个过程中做不到按需加载，即对于打包起来的资源，到底页面用不用，打包过程中是不关心的。

- 第二阶段
webpack 是从入口文件开始，经过模块依赖加载、分析和打包三个流程完成项目的构建。在加载、分析和打包的三个过程中，可以针对性的做一些解决方案，比如code split（拆分公共代码等）。

- webpack常做的一些事情
    - 模块化打包，一切皆模块，JS 是模块，CSS 等也是模块；
    - 语法糖转换：比如 ES6 转 ES5、TypeScript；
    - 预处理器编译：比如 Less、Sass 等；
    - 项目优化：比如压缩、CDN；
    - 解决方案封装：通过强大的 Loader 和插件机制，可以完成解决方案的封装，比如PWA；
    - 流程对接：比如测试流程、语法检测等。

## npm常用命令
```
npm info lodash  查看某个包的信息
npm search lodash  查询所有带lodash的npm包
npm list --global 查看全局安装的模块
```

## webpack究竟是什么？
是一个[模块打包工具]，现在我们学习webpack4.0版本
```
1、yarn init -y
2、yarn add webpack-cli@3.1.2 -D
3、yarn add webpack@4.25.1
4、npx webpack index.js  // webapck对index.js的内容进行打包

npx webpack -v  查看当前项目中webpack的版本
npm info webpack  查看webpack的历史版本

webpack-cli的作用：在命令行中可以执行webpack指令。

如果创建了webpack.config.js之后（webpack.config.js是默认配置文件），直接输入就可以`npx webpack`打包了。
如果想按照文件config1.js的配置进行打包，则输入`npx webpack --config config1.js`即可实现。

在package.json中配置scripts脚本运行，他会先去所在工程项目中找webpack，然后再去全局找。然后再命令行之后npm run bundle就可以执行了。
"scripts": {
    "bundle": "webpack"
}
```

## 尝试两种暴露和引用模块的方式
- ES Moudule 模块引入方式
    - export default HeadModule
    - import HeadModule from './head.js'
- commonjs模块引入方式
    - module.exports = HeadModule
    - const HeadModule = require('./head.js')



- 参考资料：
https://v4.webpack.js.org/concepts/modules/  模块
https://v4.webpack.js.org/guides/   开始入门



## loader是什么？
是一种打包方案。
他能让某种特定文件以怎样的方式打包。
只要不是.js结尾的文件，都需要通过配置loader打包，不然会出现打包失败的情况。

配置方式例子如下：
```
module: {
    rules: [
        {  // 用file-loader将图标文字给解析
            test: /\.(eot|woff2|woff|ttf|svg)$/i,
            use: ['file-loader']
        }
        ...
    ]
}
```

### file-loader
测试代码在loader1，适合较大的图片。后面打包字体图标也用了这个loader

默认情况下生成的文件名就是文件内容的md5+文件扩展名。

### url-loader（推荐这个）
测试代码在loader1，适合较小的图片。
使用limit做图片的大小限制。

还有一个知识点：安装了url-loader就不用再安装file-loader，因为url-loader的`fallback`默认是file-loader，即当限制大小超过了设置则用`file-loader`的配置方式。


### 打包css
- style-loader和css-loader之间的关系
1、如果在JS中导入了css，那么就需要使用 css-loader 来识别这个模块，通过特定的语法规则进行转换内容最后导出。可以处理import / require @import / url引入的内容。
2、css-loader处理之后导出的是：带有css内容的模块的数组，页面是无法使用这样一个数据的，需要style-loader来处理。

如果单独使用style-loader也是可以的。它产生的样式会直接插入到html的头部。


测试代码在loader1。module配置的执行顺序是「从下到上，从右到左」
- style-loader
    - 将样式文件写在html的头部，并不负责解析css之间的依赖关系
- css-loader
    - 将相关的css文件汇总，整合到一个css文件中
- less-loader
    - 解析和打包.less文件，需要注意是版本的兼容问题。
        - 我这里是less@3.9.0,less-loader@5.0.0。
- postcss-loader
    - 填充css3的兼容写法，自动增加浏览器厂商标识
        - 除此之外，需要安装autoprefixer@9.3.1和配置文件`postcss.config.js`帮助完成自动添加前缀的功能。

#### 增加一些css配置的讲解（css modules）
测试代码在loader2。

- 增加css modules的配置，即样式私有化。
    - importLoaders: 2,  // 指通过import语法引入的less文件，也会先走下面2个loader，才会走css-loader（）
    - modules: true,  // 开启css模块化（即css私有性），查看样式发现类名变成hash的了。

- 配置字体图标
    - 这里有一个问题，我添加css-loader的模块私有化之后样式就没生效了，不知道为什么？   👃
使用`file-loader`进行编译和打包，然后引入iconfont的图标库


- 参考资料：
https://v4.webpack.js.org/loaders/   loader内容




## plugin配置
plugin可以在webpack运行到某个时刻的时候，帮你做一些事情。

- html-webpack-plugin
作用是：HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中。
可以设置一个index.html的模板文件，以他为模板入口在dist文件下生成。

- clean-webpack-plugin@1.0.0（存在版本的兼容问题）

作用是：打包之前删除上一次打包产生的记录，可配置打包的文件夹（如：dist）


## entry和output
- 从一个最基础的配置开始分析。
entry表示以src/index.js作为入口进行打包，打包之后默认名称叫做main.js。
output表示对打包之后的文件重新命名为bundle.js，并配置打包后的文件夹名称为dist。
```
entry: {
    'main': './src/index.js',
},
output: {
    filename: 'bundle.js',  // 打包后的文件名
    path: path.resolve(__dirname, 'dist')  //配置文件路径
}
```

- 如果要对两个入口文件进行打包怎么配置呢？
两个入口分别是main和sub，打包之后的文件名即为main.js和sub.js
```
entry: {
    'main': './src/index.js',
    'sub': ''./src/content.js
},
output: {
    publicPath: 'http://www.family.cn'   // 这个是配置cdn地址，会在引入文件前加上这个链接。
    filename: '[name].[ext]',  // 打包后的文件名
    path: path.resolve(__dirname, 'dist')  //配置文件路径
}
```

- 参考资料：
https://v4.webpack.js.org/configuration/entry-context/   entry(简单看)
https://v4.webpack.js.org/configuration/output/#outputpublicpath    output(简单看)
https://v4.webpack.js.org/guides/output-management/   output-management(逐行看）
https://v4.webpack.js.org/plugins/html-webpack-plugin(仔细看)


