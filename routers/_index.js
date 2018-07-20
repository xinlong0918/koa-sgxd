const router = require('koa-router')();
const config = require('../config/config');

router.get('/', async (ctx) => {
    ctx.redirect('/index');
});

router.get('/index', async ctx => {
    let imgs = ['http://'+ config.host +':3200/img/bg.jpg','http://'+ config.host +':3200/img/bg.png'];
    let tuijian = [];
    let data = {
        imgs,
        tuijian
    }
    await ctx.render('_index', {
        title: '沂蒙水果小店',
        ...data
    });
})

router.get('/getTuijian', ctx => {
    ctx.response.body = {
        code: 200,
        message: 'ok',
        data: {}
    }
})

module.exports = router;