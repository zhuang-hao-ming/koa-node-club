const $user = require('../lib/core').$user
const render = require('../lib/render')

module.exports.get = function* () {
    this.body = yield render('signin', this.state)
}

module.exports.post = function* () {
    let body = this.request.body
    let userInfo = yield $user.getUserByName(body.name)
    if (!userInfo || userInfo.password !== body.password) {
        this.flash = { error: '用户名或密码错误' }
        return this.redirect('back')
    }
    this.session.user = {
        name: userInfo.name,
        email: userInfo.email
    }
    this.flash = { success: '登录成功' }
    this.redirect(`/user/${userInfo.name}`)
}

