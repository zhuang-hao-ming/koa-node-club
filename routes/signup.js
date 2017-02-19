const Model = require('../lib/core')
const $user = Model.$user
const render = require('../lib/render')
const merge = require('merge-descriptors')
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
    this.session.user = {
        name: data.name,
        email: data.email
    }
    this.flash = { success: '注册成功'}
    this.redirect('/')

}

