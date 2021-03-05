
## underscore源码架构
```
(function(root){
    var _ = function(obj) {
        ...
    }
    _.unique = function(arr, cb){

    }

    _.mixin(_);
    root._ = _;
})(this)
```

### 如何实现链式调用？
_.chain()

### 如何停止链式调用直接返回
_.value()


### 如何实现下列写法达到相同效果，且兼容unique一个参数和两个参数的情况？
```
_.unique([1,2,3], (item) => {...})  // 情况1：直接调用静态属性方法
_(([1,2,3]).unique( (item) => {...})    // 情况2：调用实例方法

在执行情况1的时候，其实执行的是「实例」.unique,此时会走mixin方法，即会自动把this.wrap这个源数据塞到参数的第一位。

情况2是正常执行情况。
```
