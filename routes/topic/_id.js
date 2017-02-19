const render = require('../../lib/render')
const $comment = require('../../lib/core').$comment
const $topic = require('../../lib/core').$topic
const $user = require('../../lib/core').$user
const merge = require('merge-descriptors')
module.exports.get = function* (id) {
    let data = {
        userInfo: yield  this.session.user ? $user.getUserByName(this.session.user.name) : {},
        topic: yield $topic.getTopicById(id),
        comments: yield $comment.getCommentsByTopicId(id)
    }
    merge(data, this.state)
    this.body = yield render('topic', data)
}

module.exports.post = function* (id) {
    let data = this.request.body
    data.user = this.session.user
    yield [
        $comment.addComment(data),
        $topic.incCommentById(id)
    ]
    this.flash = { success: '回复成功' }
    this.redirect('back')
}