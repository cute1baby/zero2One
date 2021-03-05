import "@babel/polyfill"

import avatarModule from './avatarModule/avatar'
import contentModule from './contentModule/content'
import createNumber from './createNumber'
import './assets/css/index.less'

contentModule()
createNumber()
console.log('监听的端口是3006')

// 默认情况下，更改文件之后文件不会在什么都不做下重新刷新（当然手动点刷新会重新请求），于是下面的代码设置了当createNumber文件变化时，会重新执行初始化函数。
if(module.hot) {
	module.hot.accept('./createNumber', () => {
		document.body.removeChild(document.getElementById('pDom'));
		createNumber();
	})
}