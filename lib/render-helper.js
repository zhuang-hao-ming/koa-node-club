const moment = require('moment')
const gravatar = require('gravatar')


function fromNow(date) {
    return moment(date).fromNow()
}

function emailToImgUrl(email) {
    return gravatar.url(email)
}



module.exports = {
    emailToImgUrl,
    fromNow
}