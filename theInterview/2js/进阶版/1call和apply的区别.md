任务68（2-1）

## 1、call和apply的区别是什么，那个性能好一点？
引出bind(预先处理this指向，但并不会立即执行)
在传的参数3个以内时，性能相差不大；参数个数超过3个时，call比apply的性能稍微好一点。
```
let arr = [10, 20, 30],
    obj = {}
function fn(x,y,z){}
fn.apply(obj, arr)
fb.call(obj, ...arr)
```

自己实现性能测试(仅供参考)：任何的代码性能都跟测试的环境有关系。如：cpu,内存和GPU等电脑性能指标。不同浏览器之间也会导致性能不同。
```
// 可以测试出一段程序执行的时间
console.time('t1')
for(let i=0;i<10000;i++){

}
console.timeEnd('t1')
```



