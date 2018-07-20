const router = require('koa-router')();

router.get('/mine', async ctx => {
    await ctx.render('mine', {
        title: '我的'
    })
});

router.post('/logout', async ctx => {
    ctx.session = {};
    ctx.response.body = {
        code: 200,
        timestamp: Date.now(),
        data: true,
        message: '退出登陆成功'
    }
});

module.exports = router;