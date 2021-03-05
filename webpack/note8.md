## 从create-app-react分析webpack
项目见：`create-app-react`

创建了create-app-react脚手架之后，输入`npm run eject`就可以看到项目隐藏的配置了。



## 从vue-cli@3.0分析webpack
项目见：`vue-cli3.0`

vue的理念就是让用户更简单的配置项目，可以直接进入vue-cli的配置文件目录：https://cli.vuejs.org/zh/config/。

通过vue-cli@3.0创建文件脚手架之后，创建一个vue.config.js的文件，然后阅读vue-cli配置文件的规则进行配置(他的配置是在webpack为基础上的二次封装)。

当发现有一些效果vue的配置无法实现的时候，可以在`vue.config.js`中配置webpack的configureWebpack属性实现效果。代码如下：
```
configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
}
```


## webpack几大模块的作用
- API：自定义babel和plugin的帮助文档
- CONCEPTS：核心知识点，都有哪些配置。
- CONFIGURATION：所有的细节文档配置查询。
- GUIDES：一些优化的常用配置。如代码分割、热跟新。
- LOADERS：官方推荐的一些常用loaders文档。
- PLUGINS：官方推荐的一些常用plugins文档。


