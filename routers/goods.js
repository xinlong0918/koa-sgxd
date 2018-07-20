const router = require('koa-router')();
const mysql = require('../sql/_mysql');

router.post('/addGoods', async ctx => {
    console.log('新增商品 请求参数： '+JSON.stringify(ctx.request.body));

    ctx.response.body = {
        code: 200,
        message: '添加成功',
        timestamp: Date.now(),
        data: ''
    }
})

module.exports = router;