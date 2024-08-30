const jwt = require('jsonwebtoken')
const { token_secret } = require('../config')

// 创建token
exports.createToken = (payload) => {
    payload = payload || {name: 'xiaowu', id: 1}
    const token = jwt.sign(payload, token_secret, {expiresIn: '2h'})
    return token
}

// 验证token
const verifyToken = (token) => {
    let rst = null
    try {
        const decodePayload = jwt.verify(token, token_secret)
        rst = {
            code: 200,
            data: decodePayload,
            msg: ''
        }
        return rst
    } catch (error) {
        switch(error?.message) {
            case 'TokenExpiredError':
                console.error('令牌过期');
                rst = {
                    code: 403,
                    msg: '令牌过期',
                    data: null
                }
                break
            case 'JsonWebTokenError':
                console.error('无效的令牌 😡');
                rst = {
                    code: 401,
                    msg: '无效的令牌 😡',
                    data: null
                }
                break;
                // 处理其他类型的错误
            default:
                console.error(error.message);
                rst = {
                    code: 401,
                    msg: error.message,
                    data: null
                }
        }
        
        return rst
    }
}
exports.verifyToken = verifyToken
// 拿token里的信息
exports.getTokenInfo = (req) => {
    const authorization = req.headers.authorization
    let token = ''
    if(authorization.includes('Bearer ')) {
        token = authorization.split('Bearer ')[1]
    }
    console.log('token',token);
    const rst = verifyToken(token)
    console.log('rst',rst);
    return rst
}