function Content(name, age){
    this.name = name
    this.age = age
}

Content.prototype.playCon = function(){
    console.log('他的名字是：'+this.name + '，他喜欢打篮球')
}

// export default Content
module.exports = Content