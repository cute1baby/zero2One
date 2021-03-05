const loaderUtils = require('loader-utils');

module.exports = function(source){
    // 通过this获取传过来的值，比如this.query.name和这里的options.name一样
    const options = loaderUtils.getOptions(this)
    // return source.replace('lee', '李钟')
    return source.replace('lee', options.name)
    // 等价于上面，而且能传递自定义参数出去给webpack.confog.js
    // const results = source.replace('lee', options.name)
    // this.callback(null, results, null, '自定义参数')
}


// 编写异步的loader
module.exports = function(source){
    const options = loaderUtils.getOptions(this)
    const callback = this.async()
    setTimeout(() => {
        const result = source.replace('lee', options.name)
        callback(null, result)
    }, 1000)
}