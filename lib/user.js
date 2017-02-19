const UserModel = require('../models').User

module.exports = {
    addUser (data) {
        return UserModel.create(data)
    },

    getUserById (id) {
        return UserModel.findById(id).exec()
    },

    getUserByName (name) {
        return UserModel.findOne({ name }).exec()
    }

}