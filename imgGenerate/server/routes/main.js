/***********************开始引入基础插件***********************************/
const Router = require('koa-router')
const router = new Router()
const Itgw = require('image-template-generator-web');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const {paramsMissingFun, successFun, failFun} = require('../utils/tool.js')
const { generateFunc } = require('../utils/generate.js');
const { uploadFile } = require('../utils/uploadImg.js');
const baseUrl = `http://img.familyli.cn/`;
const resolve = function(...paths) {
    return path.resolve(__dirname, ...paths);
};

/************************结束引入基础插件**********************************/

// 生成电商宣传海报
router.post('/beElectricityPoster', async ctx => {
  const {
    userName,
    learnDate
  } = ctx.request.body;
  if (!userName.trim()) {
    ctx.body = paramsMissingFun('用户名缺失')
  }
  if (!learnDate.trim()) {
    ctx.body = paramsMissingFun('日期缺失')
  }

  // 参数的文件路径要相对于utils/generate.js来做。
  const data = await generateFunc({
    bgPic: resolve('../images/temp.png'),
    material: {
        logo: {
            size: '86,86',
            position: '+144+10',
            style: {
                borderRadius: '50%',
                border: '1px solid #F8A564',
                boxShadow: '0 0 6px #D9A278'
            },
            default: resolve('../images/avatar.png')
        },
        banner: {
            size: '240,200',
            position: '+66+155',
            // default: ''
            default: resolve('../images/banner.jpg')
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
            default: '这是个好手机啊，苹果啊'
        },
        slogan: {
            size: '343,56',
            position: '+14+430',
            default: resolve('../images/slogan.png')
        },
        qrcode: {
            size: '91,91',
            position: '+93+528',
            // default: 'http://img003.qufenqi.com/products/cb/9f/cb9fbcf2eddb111b08ec6c0795900060.png'
            default: resolve('../images/qrcode.png')
        }
    },
    mergedObj: {
        type: 'Path',
        path: resolve('../newImgPath/merged.png'),
        width: 375,
        height: 667
    }
  })
  const resToken = await axios.post('http://server.familyli.cn/uploadImg', {
    fileName: ''
  })
  const localFile = data.path;
  const uploadToken = resToken.data.data;
  try {
    const {respInfo, respBody} = await uploadFile(uploadToken, localFile);
    const successKey = respInfo.data.key;
    // 图片生成成功
    ctx.body = successFun({
        url: `${baseUrl}${successKey}`
    })
  } catch (error) {
    ctx.body = failFun({
        data: error
    })
  }
})

// 查询内容详情
router.get('/findDetails', async ctx => {
    const contentId = ctx.query.contentId || 0
    let item = await Models.Contents.findOne({
        where: {
            contentId
        },
        include: { model: Models.Comments }
    })
    // console.log(item)
    ctx.body = {
        code: 0,
        data: {
            id: item.id,
            contentId: item.contentId,
            name: item.name,
            contentList: item.contentList,
            desc: item.desc,
            likeCount: item.likeCount,
            comments: item.Comments.map(c => {
                return {
                    id: c.id,
                    commentId: c.commentId,
                    content: c.content
                }
            })
        }
    }
})


module.exports = router