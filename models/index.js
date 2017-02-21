const mongoose = require('mongoose')
const config = require('config-lite')
mongoose.Promise = global.Promise
mongoose.connect(config.mongodb.url)
    .then(() => {
        console.log('connect successfully')
    })
    .catch((err) => {
        console.error(`connect to ${config.mongodb.url} error ${err.message}`)
        process.exit(1)
    })

module.exports = {
    User: require('./user'),
    Topic: require('./topic'),
    Comment: require('./comment')
}


