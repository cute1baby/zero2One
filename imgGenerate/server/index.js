const Itgw = require('image-template-generator-web');
const path = require('path');
const fs = require('fs');
const resolve = function(...paths) {
    return path.resolve(__dirname, ...paths);
};


Itgw(resolve('./images/temp.png'), {
    logo: {
        size: '86,86',
        position: '+144+10',
        style: {
            borderRadius: '50%',
            border: '1px solid #F8A564',
            boxShadow: '0 0 6px #D9A278'
        },
        default: resolve('./images/avatar.png')
    },
    banner: {
        size: '240,200',
        position: '+66+155',
        // default: ''
        default: resolve('./images/banner.jpg')
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
        // default: '更多商品，敬请期待'
        default: 'Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机test'
    },
    slogan: {
        size: '343,56',
        position: '+14+430',
        default: resolve('./images/slogan.png')
    },
    qrcode: {
        size: '91,91',
        position: '+93+528',
        // default: 'http://img003.qufenqi.com/products/cb/9f/cb9fbcf2eddb111b08ec6c0795900060.png'
        default: resolve('./images/qrcode.png')
    }
}).then((temp) => {
    // 根据模板生成对应的图片
    return temp.gen({}, {
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