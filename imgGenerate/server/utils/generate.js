const Itgw = require('image-template-generator-web');
const path = require('path');
const fs = require('fs');
// const resolve = function(...paths) {
//     return path.resolve(__dirname, ...paths);
// };
/**
 * 
 * @param {*}
 * bgPic: 背景图片
 * material: 准备合成图片的素材
 * supplement: 对合成素材的补充，即返回的temp对象中的tempConf属性值；如果material中的配置不完全，
 *             可以针对不完全的部分进行补充说明，如果没有写{}占位即可。
 * mergedObj: 最终输出的图片配置
 * @returns Promise对象
 */
const generateFunc = ({
  bgPic,
  material,
  mergedObj,
  supplement={}
}) => {
  return Itgw(bgPic, material).then((temp) => {
      // 根据模板生成对应的图片
      return temp.gen(supplement, mergedObj)
  }).then((data) => {
      return Promise.resolve(mergedObj)
      console.log('生成图片成功: ./merged.png !');
  }).catch((err) => {
      console.error(err);
  })
}

module.exports = {
    generateFunc
}