## 自己编写loader


### 做一个简单功能的loader
项目简化【loader7】

功能是：在代码中只要见到有‘dell’的代码，就把`dell`换成`李钟`。

module中this的使用在`api => loader interface`中。链接在：https://webpack.js.org/api/。

这里的插件`loader-utils`是方便解析从module中传过来，用this接收的参数的

注意，在自定义的loaders/replaceLoader.js中向外一定是定义一个函数（并且这个函数不能是箭头函数），会使用到this。

#### 编写一个异步的loader
见【loader7/loaders/replaceLoaderAsync.js】

这里主要用了一个方法this.async()的一个方法，赋值给函数callback，然后把返回值作为参数传入到callback中。callback接收两个参数，callback(a,b), a表示报错信息，b表示返回的真实内容。


### webpack的一种简写方式
在webpack做如下配置：
```
resolveLoaders: {
    modules: ['node_modules', './loaders']
},
```
那么在引入`./loaders/replaceLoader.js`时就不用像`path.resolve(__dirname, './loaders/replaceLoader.js')`那么麻烦了，直接`replaceLoader`即可。


### 自己写loader适用于什么场景？
1、比如我在业务代码中不想写`try...catch...`嵌入到代码中，那我可以写一个loader，去动态的检测这个项目中的所有function，匹配之后自动给每个方法加上`try...catch...`。

2、比如我想写一个国际化的业务逻辑，那么我可以写一个loader动态替换之前编写好的内容。比如在业务代码中使用{{title}}代表标题，然后再loader中写一段类似这样的逻辑。
```
if(node全局变量===中文){
    // 可以用正则去匹配
    source.replace('{{title}}', '中文标题')
}else {
    source.replace('{{title}}', '英文标题')
}
```




## 如何编写一个plugin插件
loader和plugin的区别？
loader：处理模块的功能。比如用一套规则单独处理js模块，用一套规则单独处理css。
plugin：打包的某个时刻生效。比如我要在打包之前将之前dist文件夹下的文件删除，那么引用了`clean-webpack-plugin`。


自定义的plugin其实是一个类，我们在使用这个plugin插件的时候相当于是实例化该类，实现plugin插件的功能。

如果要以调试模式运行项目，可以使用`node --inspect --inspect-brk node_modules/webpack/bin/webpack.js`,然后在项目运行的地方写上`debugger`，就可以实时调试了。


### 理解一下CopyrightWebpackPlugin这个插件
```
class CopyrightWebpackPlugin {
    // 这个compiler相当于是webpack的一个实例对象
    apply(compiler){

    }
}
```

将CopyrightWebpackPlugin引入到`webpack.config.js`之后，需要使用CopyrightWebpackPlugin的时候就直接实例化他，实例化的时候就会调用apply方法。

在类中会定义一个apply方法，这个方法会接收一个compiler参数。这个compiler相当于是webpack的一个实例对象，通过这个compile可以做一些操作。
- 文档内容可以通过以下操作：documentation > API > PLUGINS > Compiler Hooks
- 或者观看下面链接：https://v4.webpack.js.org/api/compiler-hooks/

这里的Hooks指的是钩子，跟vue这些插件一样，类似生命周期函数。通过文档可以知道webpack的hooks比较典型的有这些：beforeRun(在运行编译器之前添加一个钩子),emit(将项目发送到输出目录之前执行)等等。


在执行异步回调的时候，会有2个参数。一个是compilation，一个是callback。这里需要区别的是compiler和compilation之间的区别。compiler是webpack的实例，compilation是本次打包实例。我们可以通过debugger的方式调试出compilation的结果。

这个插件的功能就是：生成一个`copyright.txt`文件，然后在文件中填写内容。
