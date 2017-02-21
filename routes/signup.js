const Model = require('../lib/core')
const $user = Model.$user
const render = require('../lib/render')
const merge = require('merge-descriptors')
const mail = require('../common/mail')
const utility = require('utility')
const config = require('config-lite')
module.exports.get = function* () {
    
    this.body = yield render('signup', this.state)
    
}

module.exports.post = function* () {
    let data = this.request.body
    let userExist = yield $user.getUserByName(data.name)
    if (userExist) {
        this.flash = { error: '用户名已存在' }
        return this.redirect('/')
    }
    yield $user.addUser(data)
    // this.session.user = {
    //     name: data.name,
    //     email: data.email
    // }

    // 发邮件
    mail.sendActiveEmail(data.email, utility.md5(data.email + config.secret + data.password), data.name)

    this.flash = { error: '此帐号还没有被激活，激活链接已发送到 ' + data.email + ' 邮箱，请查收。' }
    this.redirect('/')

    



}

