const {userModel} = require('../model/index.js')

// 注册用户
exports.registUserDao = ({userName, email, password}) => {
   return new Promise(async (resolve, reject) => {
        userModel.create({
            userName,
            email,
            password,
            createTime: new Date().getTime(),
        }).then(res => {
            resolve(res)
        }).catch((err) => {
            console.log('在这里吗？');
            reject(err)
        })
   })
}
// 判断用户名或邮箱是否占用
exports.judgeNameOrEmailDao = ({userName, email}) => {
    let whereStr = {}
    userName && (whereStr['userName'] = userName)
    email && (whereStr['email'] = email)
    return new Promise((resolve, reject) =>{
        console.log('whereStr',whereStr);
        // 查找存在个数
        userModel.countDocuments(whereStr)
        .then((count) => {
            console.log('count',count);
            resolve(count)
        })
        .catch((error) => {
            reject(err)
        })
    })
}
// 登录
exports.loginDao = ({userName, email}) => {
    let whereStr = {}
    userName && (whereStr['userName'] = userName)
    email && (whereStr['email'] = email)
    return new Promise((resolve, reject) =>{
        // 查找存在个数
        userModel.find(whereStr)
        .then(data => {
            console.log('找到用户', data);
            // 将用户交给service去判断
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
// 查用户信息
exports.getUserDao = ({userId}) => {
    let whereStr = {}
    userId && (whereStr['userId'] = userId)
    // const out = {userId: 1, userName: 1, imgUrl: 1}
    return new Promise((resolve, reject) =>{
        // 查找存在个数
        userModel.find(whereStr)
        .then(data => {
            console.log('找到用户', data);
            // 将用户交给service去判断
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
// 查用户列表
exports.getUserListDao = ({userId,keyword }) => {
    let whereStr = {}
    userId && (whereStr['userId'] = userId)
    // 好友名模糊查询
    keyword && (whereStr['userName'] = {$regex: keyword, $options: 'i'})
    // const out = {userId: 1, userName: 1, imgUrl: 1}
    return new Promise((resolve, reject) =>{
        // 查找存在个数
        userModel.find(whereStr)
        .then(data => {
            console.log('找到用户', data);
            // 将用户交给service去判断
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}