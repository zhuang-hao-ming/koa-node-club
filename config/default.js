const path = require('path')

module.exports = {
    port: process.env.PORT || 3001,
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
    name: '论坛',
    mailConf: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'sysuhaoming@126.com',
            pass: 'zhuang154815'
        },
        ignoreTLS: true
    },
    secret: 'awefwefwe'
}