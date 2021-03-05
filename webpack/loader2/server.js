const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')

// 这种属于在node中直接使用webpack
const compiler = webpack(config)
const app = express()

// 使用中间件webpackDevMiddleware监听文件的变化
app.use(webpackDevMiddleware(compiler, {}))

app.listen(3006, (req, res) => {
    console.log('express服务启动了')
})