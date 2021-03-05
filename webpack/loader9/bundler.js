const fs = require('fs');
const path = require('path');
// 将代码字符串转换成ast抽象语法树
const parser = require('@babel/parser');
// 匹配引入的文件依赖
const traverse = require('@babel/traverse').default;
// 语法解析
const babel = require('@babel/core');


// 分析模块化文件
const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = parser.parse(content, {
		sourceType: 'module'
	});
    const dependencies = {}
    // 将ast语法树
    traverse(ast, {
        ImportDeclaration({ node }){
            // 当前路径在哪个文件夹下面
            const dirname = path.dirname(filename);
            // 将当前文件夹和当前文件进行合并，获取到新的路径。
            const newFile = './' + path.join(dirname, node.source.value);
            // console.log(dirname, newFile);
            // 将文件路径插入到数组中
            dependencies[node.source.value] = newFile
            // console.log('node', node)
        }
    })
    // 将es modules语法的代码转换成浏览器可以解析的代码，这里的code就是es5代码。
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    console.log('code>>>', code)
    /**
     * filename: 是指入口文件
     * dependencies: 依赖对象
     * code: 被解析后的es5代码(能被浏览器解读)
     */
    return {
        code,
        filename,
        dependencies
    }
    // console.log('dependencies>>>', dependencies)
}

// 分析依赖关系图谱
const makeDependenciesGraph = (entry) => {
    // 入口文件模块
    const entryModule = moduleAnalyser(entry);
	const graphArray = [ entryModule ];
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const { dependencies } = item;
        if(JSON.stringify(dependencies) !=='{}'){
            for(let j in dependencies){
                graphArray.push(
                    moduleAnalyser(dependencies[j])
                )
            }
        }
    }
    const graph = {};
	graphArray.forEach(item => {
		graph[item.filename] = {
			dependencies: item.dependencies,
			code: item.code
		}
	});
	return graph;
}

// 生成代码
const generateCode = (entry) => {
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    return `
		(function(graph){
			function require(module) { 
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
}

// 将返回的数据打印出来
const graghInfo = generateCode('./src/index.js');
console.log(graghInfo);