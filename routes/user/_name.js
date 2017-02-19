module.exports.get = function* (name) {
    this.body = `GET /user/${name}`
}

module.exports.post = function* (name) {
    this.body = `POST /user/${name}`
}