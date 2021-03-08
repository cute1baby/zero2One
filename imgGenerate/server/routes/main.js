/***********************开始引入基础插件***********************************/
const Router = require('koa-router')
const router = new Router()
const Itgw = require('image-template-generator-web');
const path = require('path');
const fs = require('fs');
const resolve = function(...paths) {
    return path.resolve(__dirname, ...paths);
};
/************************结束引入基础插件**********************************/

// 生成电商宣传海报
router.post('/beElectricityPoster', async ctx => {
    const query = ctx.request.body;
    // const searchName = ctx.query.searchName || ''
    // // 查找包含某个字段的数据
    // let {count, rows} = await Models.Contents.findAndCountAll({
    //     where: {
    //         [Op.or]: [
    //             {
    //                 name: {
    //                     [Op.like]: `%${searchName}%`
    //                 }
    //             },{
    //                 desc: {
    //                     [Op.like]: `%${searchName}%`
    //                 }
    //             }
    //         ]
    //     },
    // })
    ctx.body = {
        code: 0,
        count: count,
        data: rows.map(item => {
            return {
                id: item.id,
                contentId: item.contentId,
                name: item.name,
                contentList: item.contentList,
                desc: item.desc,
                likeCount: item.likeCount
            }
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

// 查询评论接口
// router.get('/findCommentData', async ctx => {
//     let {count, rows} = await Models.Comments.findAndCountAll({
//         where: {
//             commentId: 3
//         },
//         include: { model: Models.Contents }
//     })
//     console.log(count, rows)
//     ctx.body = {
//         code: 0,
//         count: count,
//         data: rows.map(item => {
//             return {
//                 id: item.id,
//                 commentId: item.commentId,
//                 content: item.content,
//                 name: item.Content.name,
//                 contentList: item.Content.contentList,
//                 desc: item.Content.desc,
//                 likeCount: item.Content.likeCount
//             }
//         })
//     }
// })

module.exports = router