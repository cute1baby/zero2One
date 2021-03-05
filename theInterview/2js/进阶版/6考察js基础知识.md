任务73（2-6）

## 以下题目输出什么结果：
- 1、对象的属性名不能是一个对象(遇到对象属性名，会默认转换为字符串)
```
obj={}  arr=[12, 33]  obj[arr]='珠峰'  
最后输出：obj=> {"12,33": "珠峰"}
```

- 2、普通对象.toString()，调取的是Object.prptotype上的方法(这个方法是用来检测数据类型的)
```
obj={}  b={n:1} c={n:2} 
// b.toString() = "[object Object]"
obj[b] = '1'  obj[c] = '2'
最后输出：obj[b]=> 2
```

- 3、Symbol是es6中新增的数据类型，用来创建一个独一无二的值。
```
typeof Symbol('12') === 'symbol'
Symbol('12') === Symbol('12')  // false
```