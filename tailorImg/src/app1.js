var fs = require('fs'),
    path = require('path'),
    // gm = require('gm').subClass({imageMagick: true});
    gm = require('gm');
const { resize } = require('imagemagick');


// 重新设置宽高
gm(path.resolve(__dirname, '../imgs/avatar.png'))
.resize(100, null)   // 重置宽高，并保持宽高比
.borderColor('#017991') // 边框颜色
.border(2, 2)   // 边框宽度
.blur(10)   // 模糊值
.emboss(3)  // 浮雕值
.write(path.resolve(__dirname, '../cloneImgs/app1.png'), function (err) {
    if (!err){
        console.log('图片裁剪成功');
    }else{
        console.log('图片裁剪失败');
    }
});