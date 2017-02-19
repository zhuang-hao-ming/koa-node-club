const render = require('../lib/render')
const $user = require('../lib/core').$user
const $topic = require('../lib/core').$topic
const merge = require('merge-descriptors')

module.exports.get = function* () {
    let tag = this.query.tag
    let p = this.query.p || 1
    let data = yield {
        userInfo: this.session.user ? $user.getUserByName(this.session.user.name) : {},
        topics: $topic.getTopicsByTag(tag, p),
        noReplyTopics: $topic.getNoReplyTopics(),
        nowTag: tag
    }


    
    merge(data, this.state)

    this.body = yield render('index', data)
}