const comment = require('./comment')
const user = require('./user')
const topic = require('./topic')

module.exports = {
    get $user () {
        return user
    },
    get $comment () {
        return comment
    },
    get $topic () {
        return topic
    }
}