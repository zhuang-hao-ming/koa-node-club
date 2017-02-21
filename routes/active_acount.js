const utility = require('utility')
const $user = require('../lib/core').$user
const validator = require('validator')
const config = require('config-lite')


module.exports.get = function* () {
    let key = validator.trim(this.query.key)
    let name = validator.trim(this.query.name)


    let flash = {}

    let data = yield $user.getUserByName(name)

    if (!data) {
        flash = { error: `不存在用户${name} 激活失败` }
    }
    else if (data.active) {
        flash = { error: '账号已经激活' }
    }
    else if (utility.md5(data.email + config.secret + data.password) !== key) {    
        flash = { error: '信息有误，激活失败' }
    }


    if (!flash.error) {
        data.active = true
        yield data.save()
        flash.success = '激活成功'
    }
    this.flash = flash
    return this.redirect('/')

}