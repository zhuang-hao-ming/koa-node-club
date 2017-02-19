const app = require('koa')()
const config = require('config-lite')
const router = require('koa-frouter')
const flash = require('koa-flash')
const session = require('koa-generic-session')
const MongoStore= require('koa-generic-session-mongo')
const errorHandler = require('koa-errorhandler')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const scheme = require('koa-scheme')

app.keys = ['fwefwecwe', 'scwegfuwjef']

/**
 * 错误处理中间件
 */
app.use(errorHandler())
/**
 * 请求体解析中间件
 */
app.use(bodyParser())
/**
 * session中间件
 */
app.use(session({
    store: new MongoStore(config.mongodb)
}))
/**
 * flash中间件
 */
app.use(flash())
/**
 * 把session和flash挂在this.state上供模板使用
 */
app.use(function* (next) {
    this.state.session = this.session
    this.state.flash = this.flash
    this.state.tags = config.tags
    this.state.helper = require('./lib/render-helper')
    yield next
})
/**
 * 静态文件中间件
 */
app.use(staticCache(config.staticCacheConf))
/**
 * scheme中间件
 */
app.use(scheme(config.schemeConf))
/**
 * 路由
 */
app.use(router(app, config.routerConf))




if (module.parent) {
    module.exports = app
} else {
    app.listen(config.port, () => {
        console.log(`listening on ${config.port}`)
    })
}

