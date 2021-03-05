var fs = require('fs'),
    path = require('path'),
    // gm = require('gm').subClass({imageMagick: true});
    gm = require('gm');
const { resize } = require('imagemagick');


// 写一句话
gm(200, 400, "#000")
.font('../font/msyh.ttf', 32)
.fontSize(12)
.stroke('#ffffff', 1)
.drawText(0, 0, "this is my name lizhong，哈哈哈", 'center')  // 字体居中 
.encoding('gb2312')
// .resize(100, 200)
.write(path.resolve(__dirname, '../cloneImgs/app3.png'), function (err) {
    console.log('写个字，生成图片');
});
