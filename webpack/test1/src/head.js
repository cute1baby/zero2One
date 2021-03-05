function HeadModule(name, age){
    this.boyFriend = name
    this.oldVal = age
}

HeadModule.prototype.playCon = function(){
    console.log('她男朋友名字是：'+this.boyFriend + '，他'+this.oldVal+'岁')
}

// export default HeadModule
module.exports = HeadModule