const TopicModel = require('../models').Topic

module.exports = {
    /**
     * 添加一个主题
     */
    addTopic (data) {
        return TopicModel.create(data)
    },
    /**
     * 通过id增加主题的pv并返回主题
     */
    getTopicById (id) {
        return TopicModel.findByIdAndUpdate(id, {
            $inc: { pv: 1 }
        }).exec()
        
    },
    /**
     * 返回指定tag下的第p页的主题。
     * 按照更新时间降序
     * 每页10条
     * 去掉content
     */
    getTopicsByTag (tag, p) {
        let query = {}
        if (tag) {
            query.tag = tag
        }
        return TopicModel
            .find(query)
            .skip((p - 1) * 10)
            .sort('-updated_at')
            .limit(10)
            .select('-content')
            .exec()
    },
    /**
     * 通过用户名，返回所有属于用户的主题
     * 按更新时间降序排列
     */
    getTopicsByName (name) {
        return TopicModel
                .find({ 'user.name': name })
                .sort('-updated_at')
                .exec()
    },
    /**
     * 通过主题的id增加主题的回复数
     */
    incCommentById (id) {
        return TopicModel
                .findByIdAndUpdate(id, {
                    $inc: { comment: 1 }
                })
                .exec()
    },
    /**
     * 返回5条最新的没有评论的主题
     */
    getNoReplyTopics () {
        return TopicModel
                .find({ comment: 0 })
                .sort('-updated_at')
                .limit(5)
                .select('title')
                .exec()
    },
    /**
     * 得到某一个tag下的主题数目
     */
    getTopicsCount (tag) {
        let query = {}
        if (tag) {
            query.tag = tag
        }
        return TopicModel
                .count(query)
                .exec()
    }

}