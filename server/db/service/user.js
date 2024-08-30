const { ecodeFun, compareFun } = require('../../utils/bcrypt')
const { createToken, getTokenInfo } = require('../../utils/jwt')
const {registUserDao, loginDao, judgeNameOrEmailDao, getUserDao, getUserListDao} = require('../dao/user')

// 注册
exports.registUserService = async (req) => {
    const {userName, email, password} = req.body
    return new Promise((resolve, reject) => {
            // 加密密码
            const hashedPsw = ecodeFun(password)
            // 调用dao向数据库添加用户
            registUserDao({
                userName,
                email,
                password:hashedPsw
            })
            .then(result => {
                // 添加成功
                resolve({
                    code: 200,
                    data: {},
                    msg: 'success'
                })
            }).catch((error) => {
                // 添加失败
                reject({
                    code: 500,
                    data: {},
                    msg: error?.message || error
                })
            })
        })
    
}
// 判断用户名/邮箱是否已被占用
exports.userNameOrEmailExistsService = async (req) => {
    const {userName, email} = req.query
    try {
        const count = await judgeNameOrEmailDao( {userName, email} )
        let isExist = count == 0 ? false : true
        return {
            code: 200,
            data: isExist
        }
    } catch (error) {
        return {
            code: 500,
            msg: error?.message || error
        }
    }
}
// 登录
exports.loginService = async (req) => {
    const {userName, email, password} = req.body
    try {
        const [curUser] = await loginDao( {userName, email} )
        const hashedPassword = curUser?.password || ''
        const isCorrect = compareFun(password, hashedPassword)
        if(isCorrect) {
            const token = createToken({userId: curUser.userId, userName: curUser.userName})
            return {
                code: 200,
                data: {
                    userId: curUser.userId,
                    userName: curUser.userName,
                    email: curUser.email,
                    imgUrl: curUser.imgUrl,
                    access_token: token
                },
                msg: '登录成功'
            }
        } else{
            return {
                code: 501,
                data: {},
                msg: '登录失败'
            }
        }
        
    } catch (error) {
        return {
            code: 500,
            msg: error?.message || error
        }
    }
}
// 获取用户信息
exports.getUserService = async (req, res) => {
    const {userId} = req.query
    try {
        const [result] = await getUserDao({userId})

        return {
            code: 200,
            data: result,
            msg: ''
        }
    } catch (error) {
        return {
            code: 500,
            msg: error?.message || error
        }
    }
}

// 获取用户列表
exports.getUserListService = async (req, res) => {
    const {userId, keyword} = req.query
    try {
        let result = await getUserListDao({userId, keyword})

        const curUserInfo = getTokenInfo(req)
        console.log('curUserInfo',curUserInfo);
        // 过滤掉自己
        result = result.filter(item => item.userId != curUserInfo?.data?.userId)
        return {
            code: 200,
            data: result,
            msg: ''
        }
    } catch (error) {
        return {
            code: 500,
            msg: error?.message || error
        }
    }
}