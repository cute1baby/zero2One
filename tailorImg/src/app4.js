var fs = require('fs'),
    path = require('path'),
    // gm = require('gm').subClass({imageMagick: true});
    gm = require('gm');
const { resize } = require('imagemagick');

// 准备素材和参数  entry
const avatarPath = path.resolve(__dirname, '../imgs/avatar.png');
const outputPath = path.resolve(__dirname, '../cloneImgs/app4.png');
const avatarsize = 100;


// 头像大小处理
gm(avatarPath)
.resize(avatarsize, avatarsize)
.write(outputPath, function (res) {
  // 头像处理为圆形
  gm(avatarsize, avatarsize, 'none')
    .stroke("#017991", 1) // 边框颜色
    .fill('#910901')
    .drawCircle(avatarsize / 2, avatarsize / 2, avatarsize / 2, 0)
    .write(outputPath, function (err) {
        console.log('图片导出成功')
    });
});