// import './css/style.css'
// import './css/style1.css'
// es6的语法
// import {addFunc, reduceFunc} from './selfModules/mode'
// import _ from 'lodash'
// Common.js语法
// const {addFunc, reduceFunc} = require('./selfModules/mode')


// 调用加法
// const result = addFunc(1, 6)
// console.log('>>>>result', result)
console.log('>>>>result', _.join(['a', 'b', 'c'], '~'))
console.log('>>>>单独_join', _join(['b', 'b', 'a'], '宝马奔驰'))
console.log('this>>>', this === window)

// 同步调用方式
// console.log(_.join(['a', 'b', 'c'], '~'))


// 异步调用方式
// function getComponent() {
// 	return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['Dell', 'Lee'], '-');
// 		return element;
// 	})
// }

// 调用getComponent方法返回Promise对象
// getComponent().then(element => {
// 	document.body.appendChild(element);
// });


// 异步调用的方法，并使用魔法注释的方式异步加载
// document.addEventListener('click', () => {
//     import(/* webpackPrefetch: true */ './selfModules/click.js').then(({default: func}) => {
//         func()
//     })
// })