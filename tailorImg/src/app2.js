var fs = require('fs'),
    path = require('path'),
    // gm = require('gm').subClass({imageMagick: true});
    gm = require('gm');
const { resize } = require('imagemagick');


// 画一个圆
gm(path.resolve(__dirname, '../imgs/avatar.png'))
.fill(`#000`)
.drawCircle(50, 50, 50, 100)   // 画一个初始点x1、y1（表示圆心位置），结束点为x2、y2（表示边界位置）的圆
.write(path.resolve(__dirname, '../cloneImgs/app2.png'), function (err) {
    console.log('成功画一个圆')
})
