
const render = require('../lib/render')
const $user = require('../lib/core').$user
const $topic = require('../lib/core').$topic
const merge = require('merge-descriptors')
module.exports.get = function* () {
    let data = {
        userInfo: yield $user.getUserByName(this.session.user.name)
    }
    merge(data, this.state)

    this.body = yield render('create', data)
}

module.exports.post = function* () {
    let data = this.request.body
    data.user = this.session.user
    let topic = yield $topic.addTopic(data)
    this.flash = { success: '发布成功！' }
    this.redirect('/')
}

