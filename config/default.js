const path = require('path')

module.exports = {
    port: process.env.PORT || 3000,
    // koa-frouter 配置
    routerConf: {
        root: path.join(__dirname, '../routes'),
        wildcard: '_'
    },
    mongodb: {
        url: 'mongodb://127.0.0.1/club'
    },
    staticCacheConf: path.join(__dirname, '../public'),
    schemeConf: path.join(__dirname, './scheme.js'),
    tags: ["全部", "问答", "分享", "吐槽", "招聘"],
}