// 任务86（3-7）

## push的底层原理

let obj = {
    2: 3,
    3: 4,
    length: 2,
    push: Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)

// 解题思路：看到这种题目，obj.push方法即数组原型上的方法，是怎么实现的？
Array.prototype.push = function(item){
    this[this.length] = item;
    // 执行完之后length会自动加1
    return this.length
}
// 所以执行如下：
// obj.push(1) this=>obj  obj.length=2,即obj[2]=1,obj.length=3
// obj.push(2) this=>obj  obj.length=3,即obj[3]=2,obj.length=4
// obj = {
//     2: 1,
//     3: 2,
//     length: 4,
//     push: fn
// }