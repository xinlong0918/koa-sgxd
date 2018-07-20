const router = require('koa-router')();

router.get('/shoppingCart', async ctx => {
    await ctx.render('shoppingCart', {
        title: '购物车'
    });
})

router.get('/getOrders', async ctx => {
    console.log(JSON.stringify(ctx.session));
    if (!ctx.session.name) {
        ctx.redirect('/login');
    } else {
        ctx.response.body = {
            code: 200,
            message: 'ok',
            data: '',
            timestamp:Date.now()
        }
    }
})

module.exports = router;