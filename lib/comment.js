const CommentModel = require('../models').Comment

module.exports = {
    /**
     * 添加一条评论
     */
    addComment (data) {
        return CommentModel.create(data)
    },
    /**
     * 根据主题id获取对应的评论
     */
    getCommentsByTopicId (id) {
        return CommentModel
                .find({ topic_id: id })
                .sort('updated_at')
                .exec()
    }

}