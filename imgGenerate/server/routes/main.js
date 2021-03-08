/***********************开始引入基础插件***********************************/
const Router = require('koa-router')
const router = new Router()
const Itgw = require('image-template-generator-web');
const path = require('path');
const fs = require('fs');
const {paramsMissingFun, successFun, failFun} = require('../utils/tool.js')
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

  ctx.body = successFun({
    name: '李钟',
    meg: '图片正在生成中...'
  })
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