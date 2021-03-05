const Itgw = require('image-template-generator-web');
const path = require('path');
const fs = require('fs');
const resolve = function(...paths) {
    return path.resolve(__dirname, ...paths);
};


Itgw(resolve('./images/temp.png'), {
    logo: {
        size: '144,74',
        position: '+118+20',
        default: resolve('./images/logo.png')
    },
    banner: {
        size: '240,200',
        position: '+66+155',
        default: ''
    },
    title: {
        size: '320,60',
        position: '+28+380',
        style: {
            fontSize: '16px',
            fontFamily: 'arial, sans-serif',
            color: '#333333'
        },
        type: 'text',
        default: '更多商品，敬请期待'
    },
    slogan: {
        size: '343,56',
        position: '+14+430',
        default: resolve('./images/slogan.png')
    },
    qrcode: {
        size: '91,91',
        position: '+93+528',
        default: 'http://img003.qufenqi.com/products/cb/9f/cb9fbcf2eddb111b08ec6c0795900060.png'
    }
}).then((temp) => {
    // 根据模板生成对应的图片
    return temp.gen({
        banner: resolve('./images/banner.jpg'),
        title: 'Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机test',
        qrcode: resolve('./images/qrcode.png')
    }, {
        type: 'Path',
        path: resolve('./mergeImg/merged.png'),
        width: 375,
        height: 667
    })
}).then((data) => {
    console.log(data);
    console.log('生成图片成功: ./merged.png !');
}).catch((err) => {
    console.error(err);
})