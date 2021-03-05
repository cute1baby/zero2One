
## webpack常见的一些配置参数
```
# 修改端口号和 host
webpack-dev-server --port 3000 --host 127.0.0.1
# 启动inline 模式的自动刷新
webpack-dev-server --hot --inline
# 手动指定 webpack config 文件
webpack-dev-server --config webpack.xxx.js
# 指定 webpack 的 mode
webpack-dev-server --mode development
# watch 功能，文件发生变化则触发重新编译
webpack-dev-server --watch
# dev-server默认会将工作目录（当前目录）最为基本目录，可以手动修改它
webpack-dev-server --content-base ./build
```

最重要的功能就是热替换。并且webpack-dev-server支持两种模式的自动刷新页面。
- iframe 模式：页面被放到一个 iframe 内，当发生变化时，会重新加载；
- inline 模式：将 webpack-dev-server 的重载代码添加到产出的 bundle 中。


## HMR功能
HMR 即模块热替换（Hot Module Replacement）的简称，它可以在应用运行的时候，不需要刷新页面，就可以直接替换、增删模块。


- 1、设置devServer.hot=true，devServer.inline=true（默认）；
    - devServer.hot=true：会给 entry 添加webpack/hot/dev-serve或者webpack/hot/only-dev-serve（devServer.hotOnly=true），这个是实现 HMR 的服务端代码；
    - devServer.inline=true：会给 entry 添加webpack-dev-server/client，这是通信客户端；
- 2、在webpack.config.js中添加 plugins：new webpack.HotModuleReplacementPlugin()；
- 3、修改入口文件添加 HMR 支持代码：
```
// 在入口文件index.js最后添加如下代码
if (module.hot) {
    // 通知 webpack 该模块接受 hmr
    module.hot.accept(err => {
        if (err) {
            console.error('Cannot apply HMR update.', err);
        }
    });
}
```

最终的webpack.config.js内容如下：
```
const path = require('path');
module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        // 开启 hmr 支持
        hot: true
    },
    plugins: [
        // 添加 hmr plugin
        new webpack.HotModuleReplacementPlugin()
    ]
};
```

附加知识点：使用 webpack-dev-server 的 CLI 功能只需要命令行中添加--hot，webpack-dev-server 会自动将webpack.HotModuleReplacementPlugin这个插件添加到 Webpack 的配置中去。所以开启热跟新最简单的方式就是使用inline模式。


## 代理proxy
本地开发服务器是不能直接请求线上数据接口的，这是因为浏览器的同源安全策略导致的跨域问题，我们可以使用devServer.proxy来解决本地开发跨域的问题。
```
module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://baidu.com',
                secure: false,  // 支持https协议的接口
                pathRewrite: {'^/api': ''}
            }
        }
    }
};
```

根据上面的配置，只能代理json接口的数据。对于html文件，还是使用打包后 dist 文件夹中文件，那么我们使用bypass来实现这个需求：
```
bypass(req, res, proxyOptions) {
    // 判断请求头中的 accept 值
    if (req.headers.accept.indexOf('html') !== -1) {
        console.log('Skipping proxy for browser request.');
        // 返回的是 contentBase 的路径
        return '/index.html';
    }
}
```

或者，我们需要代理http://baidu.com下面的/api和/auth两个地址，其他的地址都放行，这时候可以使用context：
```
module.exports = {
    //...
    devServer: {
        proxy: [
            {
                context: ['/auth', '/api'],
                target: 'http://baidu.com'
            }
        ]
    }
};
```
原理上来说，webpack-dev-server 使用了 http-proxy-middleware中间件来实现的 proxy 功能，所以更多配置项及其实现可以直接参考 http-proxy-middleware的文档



## 插入中间价
在 webpack-dev-server 中有两个时机可以插入自己实现的中间件，分别是在devServer.before和devServer.after两个时机，代码如下：
```
module.exports = {
    //...
    devServer: {
        before(app, server) {
            app.get('/some/path', (req, res) => {
                res.json({custom: 'response'});
            });
        }
    }
};
```


## mock server
在前后端分离的时候，为了不影响前端的开发进度，一般都会使用数据mock。webpack-dev-server 提供了自定义中间件的 Hook，所以我们可以很简单的实现自己的 mock server。下面代码是在devServer.before插入一个接口/api/mock.json的接口响应：
```
module.exports = {
    //...
    devServer: {
        port: 9000,
        before(app, server) {
            app.get('/api/mock.json', (req, res) => {
                res.json({hello: 'world'});
            });
        }
    }
};
```
启动 dev server，访问 http://localhost:9000/api/mock.json就可以看到这个接口返回的数据了。[参考地址](https://juejin.im/post/5afba2746fb9a07aaf356327)


### devServer.compress：服务开启 Gzip 压缩
```
compress: true
```


## devServer常用配置
```
devServer.historyApiFallback：配置如果找不到页面就默认显示的页面；
devServer.compress：启用 gzip 压缩；
devServer.hotOnly：构建失败的时候是否不允许回退到使用刷新网页；
devServer.inline：模式切换，默认为内联模式，使用false切换到 iframe 模式；
devServer.open：启动后，是否自动使用浏览器打开首页；
devServer.openPage：启动后，自动使用浏览器打开设置的页面；
devServer.overlay：是否允许使用全屏覆盖的方式显示编译错误，默认不允许；
devServer.port：监听端口号，默认 8080；
devServer.host：指定 host，使用0.0.0.0可以让局域网内可访问；
devServer.contentBase：告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要；
devServer.publicPath：设置内存中的打包文件的虚拟路径映射，区别于output.publicPath；
devServer.staticOptions：为 Expressjs 的 express.static配置参数，参考文档： http://expressjs.com/en/4x/api.html#express.static
devServer.clientLogLevel：在 inline 模式下用于控制在浏览器中打印的 log 级别，如error, warning, info or none；
devServer.quiet：静默模式，设置为true则不在控制台输出 log；
devServer.noInfo：不输出启动 log；
devServer.lazy: 不监听文件变化，而是当请求来的时候再重新编译；
devServer.watchOptions：watch 相关配置，可以用于控制间隔多少秒检测文件的变化；
devServer.headers：自定义请求头，例如自定义 userAgent 等；
devServer.https：https 需要的证书签名等配置。
```