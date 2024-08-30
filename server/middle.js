const { token_whitelist } = require("./config");
const { verifyToken } = require("./utils/jwt");

// 全局中间件
exports.globalMidder = function(req, res, next) {
    // *可以 但不能种session
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,HEAD,PATCH,DELETE,PUT')
    //支持application/json
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    res.setHeader("Access-Control-Expose-Headers", "Authorization")
    next()
}
// 错误处理
exports.errorHandleMid = function(err, req, res, next) {
    res.status = err.status || 500
    console.error('发生了错误：'+ err.message);
    res.status(500).send('Error! ' + err.message)
    // res.render('error', { error: err })
}

// 验证中间件middle
exports.verifyTokenMid = function(req,res,next) {
    // 白名单
    // console.log('req?.baseUrl====',req?.baseUrl);
    console.log('req?.url======',req?.url);
    const isWhite = token_whitelist.some(item => {
        return req?.url.indexOf(item) !== -1
    })
    if(isWhite) {
        return next()
    }
    // 非白名单 验证token
    const authorization = req.headers?.authorization || ''
    let token = ''
    if(authorization.includes('Bearer ')) {
        token = authorization.split('Bearer ')[1]
    }
    const rst = verifyToken(token)
    // 200表示token验证通过
    if(rst?.code === 200) {
        next()
    } else {
        // 不通过则返回验证结果
        res.send(rst)
    }
}
