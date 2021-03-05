
## 初始化react的开发

### 初始化配置
```
# 新建目录，并且进入
mkdir react-webpack && cd $_
# 创建 package.json
npm init -y
# 安装 react react-dom依赖
npm i react react-dom
# 安装 webpack 和 webpack-cli 开发依赖
npm i webpack webpack-cli -D
# 安装 babel
npm i babel-loader @babel/core @babel/preset-env -D
# 安装 babel preset-react
npm i @babel/preset-react -D
```

### 对jsx文件的配置
因为react使用的是jsx文件后缀，所以需要给jsx田间babel的编译支持，配置如下：
```
module.exports = {
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // jsx/js文件的正则
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    // loader 是 babel
                    loader: 'babel-loader',
                    options: {
                        // babel 转义的配置选项
                        babelrc: false,
                        presets: [
                            // 添加 preset-react
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'), {modules: false}]
                        ],
                        cacheDirectory: true
                    }
                }
            }
        ]
    }
};
```
这里是将所有配置都在webpack.config.js中，没有增加.babelrc文件的配置。这是推荐写法，有些机器对.开头的文件支持性不是很好。


### 创建文件和基础配置
然后在src文件夹下创建文件，作为单页应用的载体：
    - 创建App.jsx
    - 创建index.jsx
    - 配置webpack.config.js
```
// App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
    return (
        <div>
            <h1>Hello React and Webpack</h1>
        </div>
    );
};
export default App;


// index.jsx
import App from './App'; // 这里可以省略.jsx

// webpack.config.js，配置入口文件
module.exports = {
    entry: './src/index.jsx'
    // ...
};
```
执行`npx webpack --mode development`将项目跑起来


### 设置html文件作为项目模板
先是安装 html-webpack-plugin
```
npm i html-webpack-plugin -D
```

创建文件：
```
// src/index.html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8" />
        <title>Hello React Webpack</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>

// webpack.config.js
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
        })
    ]
};
```
完成之后，执行`npx webpack --mode development`就可以看到打包


然后修改配置，就可以打包了：
```
{
    "scripts": {
        "build": "webpack --mode production"
    }
}
```

### 配置webpack-dev-server
```
yarn add webpack-dev-server -D

{
    "scripts": {
+       "dev": "webpack-dev-server --config './webpack.config.dev.js' --open"
        "build": "webpack --mode production"
    }
}
```

新建webpack.config.dev.js作为配置文件
```
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, './src/'),
        publicPath: '/',
        host: '127.0.0.1',
        port: 3000,
        stats: {
            colors: true
        }
    },
    entry: './src/index.jsx',
    // 将 jsx 添加到默认扩展名中，省略 jsx
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // jsx文件的正则
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    // loader 是 babel
                    loader: 'babel-loader',
                    options: {
                        // babel 转义的配置选项
                        babelrc: false,
                        presets: [
                            // 添加 preset-react
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'), {modules: false}]
                        ],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: true
        })
    ]
};
```



### 配置React的HMR
将修改后代码整页面无刷新且保持原有state的情况下直接反应到页面。要达到效果，需要增加下面的配置：
```
// webpack.config.dev.js
+ const webpack = require('webpack');

module.exports = {
    devServer: {
    ...
+       hot: true,
    ...
    },
    ...
    plugins: [
+       new webpack.HotModuleReplacementPlugin(),
    ...
    ]
    ...
}
```

然后新建dev.js，编写一段HMR代码，并修改`webpack.config.js`
```
// dev.js
if (module.hot) {
    module.hot.accept(err => {
        if (err) {
            console.error('Cannot apply HMR update.', err);
        }
    });
}

// webpack.config.dev.js
module.exports = {
    ...
    entry: ['./src/index.jsx', './src/dev.js']
    ...
}
```



## 初始化Vue的开发
```
// 初始化
# 新建目录，并且进入
mkdir vue-webpack && cd $_
# 创建 package.json
npm init -y
# 安装 vue 依赖
npm i vue
# 安装 webpack 和 webpack-cli 开发依赖
npm i webpack webpack-cli -D
# 安装 babel
npm i babel-loader @babel/core @babel/preset-env -D
# 安装 loader
npm i vue-loader vue-template-compiler -D
# 安装 html-webpack-plugin
npm i html-webpack-plugin -D


// app.js
import Vue from 'vue';
import App from './app.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');


// App.vue
<template>
    <div id="app">
        Hello Vue & Webpack
    </div>
</template>

<script>
    export default {};
</script>


// 创建index.html模板文件
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8" />
        <title>Webpack Vue Demo</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>


// 配置webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};
```


1、Vue 的配置文件跟 React 最大区别是，React 是直接扩展了 Babel 的语法，而 Vue 语法的模板还需要使用vue-loader来处理。
2、完成上面配置后，执行下npx webpack看下 dist 产出吧。开发相关的配置跟 React 部分基本一致。


