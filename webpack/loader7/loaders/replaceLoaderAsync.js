const loaderUtils = require('loader-utils');

// 编写异步的loader
module.exports = function(source){
    const options = loaderUtils.getOptions(this)
    const callback = this.async()
    setTimeout(() => {
        const result = source.replace('dell', options.name)
        callback(null, result)
    }, 1000)
}