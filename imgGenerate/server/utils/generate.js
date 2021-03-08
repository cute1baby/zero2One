const Itgw = require('image-template-generator-web');
const path = require('path');
const fs = require('fs');
// const resolve = function(...paths) {
//     return path.resolve(__dirname, ...paths);
// };

const func = ({
  bgPic,
  material,
  supplement,
  mergedObj
}) => {
  return Itgw(bgPic, material).then((temp) => {
      // 根据模板生成对应的图片
      return temp.gen(supplement, mergedObj)
  }).then((data) => {
      Promise.resolve(data)
      // console.log(data);
      console.log('生成图片成功: ./merged.png !');
  }).catch((err) => {
      console.error(err);
  })
}

export default func