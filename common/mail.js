const nodemailer = require('nodemailer')
const bluebird = require('bluebird')
const util = require('util')
const config = require('config-lite')
const transporter = nodemailer.createTransport(config.mailConf)

const transporterP = bluebird.promisifyAll(transporter)

const SITE_ROOT_URL = `http://127.0.0.1:${config.port}`

let count = 0

let sendmail = function (data) {
    
    transporterP.sendMailAsync(data)
        .catch(err => {
            if (++count < 5) {
                
                sendmail(data)
            }
        })

    
}

let sendActiveEmail = function (who, token, name) {
    let from = `${config.name} <${config.mailConf.auth.user}>`
    let to = who
    let subject = '激活邮件'
    let html = `
    <p>你好</p>
    <a href="${SITE_ROOT_URL}/active_acount?key=${token}&name=${name}">链接</a>
    `

    sendmail({
        from,
        to,
        subject,
        html
    })
    
}

module.exports = {
    sendActiveEmail
}