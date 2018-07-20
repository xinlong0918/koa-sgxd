const router = require('koa-router')();
const mysql = require('../sql/_mysql');

router.get('/reg', async ctx => {
    await ctx.render('_reg', {
        title: '注册'
    })
})
router.post('/reg', async ctx => {
    console.log(JSON.stringify(ctx.request.body));
    let name = ctx.request.body.name;
    let pwd = ctx.request.body.pwd;
    let code, message, timestamp, data;

    // 注册处理...
    try {
        let result = await mysql.findUserByName(name);
        console.log('查询用户：' + name + ', 结果: ' + JSON.stringify(result));
        if (result.length > 0) {
            // 返回结果
            code = 401;
            message = '用户已存在';
            timestamp = Date.now();
            data = false;
        } else {
            try {
                let result = await mysql.addUser([name, pwd, new Date()]);
                console.log('添加用户结果：', JSON.stringify(result));
                code = 200;
                message = '注册成功';
                timestamp = Date.now();
                data = true;
            } catch (e) {
                code = 402;
                message = '操作数据库错误';
                timestamp = Date.now();
                data = false;
            }

        }
    } catch (e) {
        console.log('操作数据库错误...', e);
        code = 402;
        message = '操作数据库错误';
        timestamp = Date.now();
        data = false;
    }
    ctx.response.body = {code, message, timestamp, data};

})

module.exports = router;