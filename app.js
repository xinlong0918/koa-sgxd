const Koa = require('koa');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const ejs = require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/config.js');
const router = require('koa-router')
const views = require('koa-views')
// const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const logger = require('koa-logger')
// const  serve = require("koa-static");
const app = new Koa()

// app.use(serve(__dirname+ "/public",{ extensions: ['html']}));

// session存储配置
const sessionMysqlConfig = {
    user: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
}

app.use(logger())

app.use(async (ctx, next) => {
    if (ctx.method === 'OPTIONS') {
        console.log('options...')
        ctx.body = '';
    }
    await next();
});
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    await next();
});

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))


// 配置静态资源加载中间件
// app.use(koaStatic(
//   path.join(__dirname , './public')
// ))
// 缓存
app.use(staticCache(path.join(__dirname, './public'), {dynamic: true}, {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), {dynamic: true}, {
    maxAge: 365 * 24 * 60 * 60
}))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(bodyParser({
    formLimit: '1mb'
}))

//  路由
app.use(require('./routers/util.js').sessionInterceptor)
app.use(require('./routers/_index.js').routes())
app.use(require('./routers/_login.js').routes())
app.use(require('./routers/_reg.js').routes())
app.use(require('./routers/mine.js').routes())
app.use(require('./routers/shoppingCart.js').routes())
app.use(require('./routers/goods.js').routes())


app.listen(3200)

console.log(`listening on port 3200.....`)