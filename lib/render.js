const views = require('co-views')
const path = require('path')



module.exports = views(path.join(__dirname, '../template'), {
    map: {
        html: 'ejs'
    },
    cache: false
})