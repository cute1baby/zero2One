
## 什么是 Babel
Babel 是 JavaScript 的编译器，通过 Babel 可以将我们写的最新 ES 语法的代码轻松转换成任意版本的 JavaScript 语法。


- 1、安装依赖
```
cnpm install -D babel-loader@8.0.4 @babel/core@7.2.0 @babel/preset-env@7.2.0
```

- 2、在webpack.config.js文件下做如下配置：
```
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

注意一下：第3步这种方式属于全局注入的方式，即以全局变量的方式注入进去，会污染全局环境。这种场景下适合开发一个项目业务的时候使用；但是如果要开发一个第三方插件或者类库，这种方式就不行了，就要使用第4步了。

- 3、安装@babel/polyfill，将一些高级的语法转换成低版本浏览器能解析的语法。如：`map，promise等语法`
```
npm install --save-dev @babel/polyfill@7.0.0
```
然后在所有代码执行之前，引入`import "@babel/polyfill"`就可以了。

此时打包之后的bundle.js文件大小大概476k.

但是直接这样打包的文件，在会将所有可能的情况都加入到打包文件中，但是事实上我们只需要打包我们已经使用过的高级语法。如项目中只用到map，就只转换map，而不是把promise,map，forEach这些全都打包一遍(按需引入)。配置`useBuiltIns: 'usage'`。【只转化用到的es6语法】

备注：配置了`useBuiltIns: 'usage'`后可以不引入`import "@babel/polyfill"`，这个时候会自动引入。

要实现这个目标，需要在`webpack.config.js`做如下配置。
```
use: {
    loader: 'babel-loader',
    options: {
        presets: [
            ['@babel/preset-env',{
            +    targets: {   // 表示兼容谷歌67版本以上才会进行转化成低版本js
            +       chrome: '67'
            +    },
            +   useBuiltIns: 'usage'  // 表示只打包build文件中的js高级语法
            }]
        ]
    }
}
```

此时打包之后的bundle.js文件大小大概64.5k。

配置的参考资料：https://babeljs.io/docs/en/usage   Guides / Usage guide，讲解了一些配置的方式


- 4、上面说到第3步如果在开发类库或者一些第三方插件的时候，上面那种配置方式就不适合了，所以引出了下面这种配置方式。

安装插件：
```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

在webpack.config.js做配置
```
loader: 'babel-loader',
options: {
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,  // 默认是false，我们这里设置值是2的作用就是js高级语法兼容低版本。但是还需要多安装一个插件`npm install --save @babel/runtime-corejs2`
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
}
```

再安装一个插件
```
npm install --save @babel/runtime-corejs2
```

babel/plugin-transform-runtime的配置会以闭包的方式注入，不会污染全局环境。

- 5、`.babelrc`的配置
当在`webpack.config.js`中配置babel-loader的options太多了，可以创建一个`.babelrc`文件将options的配置剪切过去，`webpack.config.js`中配置options配置删除。
```
.babelrc
{
    presets: [
        ['@babel/preset-env', {
            targets: {
                chrome: "67",
            },
            useBuiltIns: 'usage'
        }]
    ]
}
```

照着下面的引导安装和配置：
https://babeljs.io/docs/en/babel-plugin-transform-runtime
Usage / transform-runtime模块



### 总结一下上述插件的安装情况

- 1、全局注入方式
```
cnpm install -D babel-loader@8.0.4 @babel/core@7.2.0 @babel/preset-env@7.2.0
npm install --save @babel/polyfill@7.0.0
```

- 2、开发第三方插件的配置
```
cnpm install -D babel-loader@8.0.4 @babel/core@7.2.0 @babel/preset-env@7.2.0 @babel/plugin-transform-runtime
npm install --save @babel/runtime @babel/runtime-corejs2
```
