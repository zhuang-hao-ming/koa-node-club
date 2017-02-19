/**
 * 数据校验配置文件
 */

const validator = require('validator')
const crypto = require('crypto')

module.exports = {
    '(GET|POST) /signup': {
        'request': {
            'session': checkNotLogin
        }
    },
    'POST /signup': {
        'request': {
            'body': checkSignupBody
        }
    },
    '(GET|POST) /signin': {
        'request': {
            'session': checkNotLogin
        }
    },
    'POST /signin': {
        'request': {
            'body': checkSigninBody
        }
    },
    '(GET|POST) /create': {
        'request': {
            'session': checkLogin
        }
    },
    'POST /create': {
        'request': {
            'body': checkCreateBody
        }
    },
    'POST /topic/:id': {
        'request': {
            'session': checkLogin
        }
    }
}

/**
 * 断言登录
 */
function checkLogin() {
    if (this.session && this.session.user) {
        return true
    } else {
        this.flash = { error: '未登录' }
        this.redirect('/')
        return false
    }
}

/**
 * 断言未登录
 */
function checkNotLogin() {
    if (this.session && this.session.user) {
        this.flash = { error: '已登录！' }
        this.redirect('/signin')
        return false
    } else {
        return true
    }
}
/**
 * 检查注册请求体是否合法
 */
function checkSignupBody() {
    let body = this.request.body
    let flash = null
    if (!body) {
        flash = { error: '请求体解析错误' }
    }
    else if (!body.name) {
        flash = { error: '请填写用户名' }
    }
    else if (!body.email || !validator.isEmail(body.email)) {
        flash = { error: '请填写正确的email' }
    }
    else if (!body.password) {
        flash = { error: '请填写密码' }
    }
    else if (body.password !== body.re_password) {
        flash = { error: '两次密码不匹配' }
    }
    else if (!body.gender || !~['男', '女'].indexOf(body.gender)) {
        flash = { error: '请选择性别' }
    }
    else if (body.signature && body.signature.length > 50) {
        flash = { error: '个性签名不能超过50个字' }
    }
    if (flash) {
        this.flash = flash
        this.redirect('back')
        return false
    }
    body.name = validator.trim(body.name)
    body.email = validator.trim(body.email)
    body.password = md5(validator.trim(body.password))
    return true



}

/**
 * 检查登录请求体是否合法
 */
function checkSigninBody () {
    let body = this.request.body
    let flash = null
    if (!body) {
        flash = { error: '请求体解析错误' }
    }
    else if (!body.name) {
        flash = { error: '请填写用户名' }
    }
    else if (!body.password) {
        flash = { error: '请填写密码' }
    }
    if (flash) {
        this.flash = flash
        this.redirect('back')
        return false
    }
    body.name = validator.trim(body.name)
    body.password = md5(validator.trim(body.password))
    return true
}

function checkCreateBody() {
    let body = this.request.body
    let flash = null
    if (!body) {
        flash = { error: '请求体解析错误' }
    }
    else if (!body.title || body.title.length < 10) {
        flash = { error: '标题不合法' }
    }
    else if (!body.tag) {
        flash = { error: '请填写板块' }
    }
    else if (!body.content) {
        flash = { error: '请填写内容' }
    }
    if (flash) {
        this.flash = flash
        this.redirect('back')
        return false
    }
    body.title = validator.trim(body.title)
    body.tag = validator.trim(body.tag)
    body.content = validator.trim(body.content)
    return true
    
}

function md5 (str) {
    return crypto.createHash('md5').update(str).digest('hex')
}