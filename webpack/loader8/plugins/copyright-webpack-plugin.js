// 创建一个插件类
class CopyrightWebpackPlugin {
    constructor(options){
        console.log('接收传入的插件', options)
    }
    // apply(compiler){
    //     console.log('插件被使用了...')
    // }

    // 实例化时，会默认执行apply方法
    apply(compiler){
        console.log('compiler对象', compiler)
        // 同步的时候执行tap方法
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
			console.log('compiler');
		})

        // 异步的时候执行tapAsync方法
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			debugger;
			compilation.assets['copyright.txt']= {
				source: function() {
					return 'copyright by dell lee'
				},
				size: function() {
					return 21;
				}
			};
			cb();
		})
    }
}

module.exports = CopyrightWebpackPlugin;