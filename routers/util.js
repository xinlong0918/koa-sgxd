
exports.sessionInterceptor = async function (ctx, next) {
    if (!ctx.session.name && (ctx.request.url==='/shoppingCart'||ctx.request.url==='')) {
        console.log('no session...');
        await ctx.redirect('/login?from=' + ctx.request.url.substr(1));
    } else {
        await next();
    }
}