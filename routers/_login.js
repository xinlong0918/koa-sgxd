const router = require('koa-router')();
const mysql = require('../sql/_mysql');

router.get('/login', async ctx => {
    await ctx.render('_login', {title: '登陆'});
});

router.post('/login', async ctx => {
    let name = ctx.request.body.name,
        pwd = ctx.request.body.pwd,
        code, message, data, timestamp;
    if (ctx.session.name) {
        code = 403;
        message = '用户已登陆';
        timestamp = Date.now();
        data = '';
    } else {
        result = await mysql.findUserByName(name);
        console.log('查询用户： ', JSON.stringify(result));
        if (result.length === 0) {
            code = 403;
            message = '用户不存在';
            data = '';
            timestamp = Date.now();
        } else if (result[0].name === name && result[0].pwd === pwd) {
            ctx.session = {
                name: result[0].name,
                pwd: result[0].pwd
            };
            code = 200;
            message = '登陆成功';
            data = result[0].name;
            timestamp = Date.now();
        } else {
            code = 400;
            message = '用户或密码错误';
            data = '';
            timestamp = Date.now();
        }
    }
    ctx.response.body = {code, message, timestamp, data};
});

module.exports = router;