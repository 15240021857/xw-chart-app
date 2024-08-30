const config = {
    port: 3001,
    dbUrl: 'mongodb://localhost:27017/test',
    email: {
        service: 'QQ',
        auth: {
            user: '657615322@qq.com',
            pass: 'nxpyqycmgvozbccj' //SMTP授权码
        }
    },
    // token密钥
    token_secret: 'xiaowu-256-secret',
    // token验证白名单
    token_whitelist: ['/login', '/register','/userNameOrEmailExists']
}
module.exports = config