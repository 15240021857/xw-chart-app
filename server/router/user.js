const express = require('express')
const {sendMail} = require('../utils/email.js')
const { registUserService, loginService, userNameOrEmailExistsService, getUserService, getUserListService } = require('../db/service/user.js')
const router = express.Router()

const root = '/user'
// router.use((req, res, next) => {
//     console.log('123');
//     next()
// })

// 登录
router.post('/login',async  (req, res) => {
    try {
        const result = await loginService(req)
        res.send(result)
    } catch (error) {
        console.log('在这里吗？',error);
    }
   
})
// 注册
router.post('/register',async (req, res) => {
    try {
        const result = await registUserService(req)
    res.send(result)
    } catch (error) {
        console.log('在这里吗？',error);
    }
})
// 判断用户名或邮箱是否被占用
router.get('/userNameOrEmailExists',async  (req, res) => {
    const result = await userNameOrEmailExistsService(req)
    res.send(result)
})
// 发送邮箱
router.post('/sendMail', async (req, res) => {
    const to = req.body?.email
    if(!to) {
        res.send('no email', 70031)
    }
    sendMail({
        to,
        subject: 'xiaowu聊天室注册成功',
        text: 'text是什么？',
        html: `
            <h2>欢迎来到xiaowu聊天室</h2>
            <p>您的账号注册成功，可以点击此链接去登录</p>
            <a href="http://192.168.10.6:5173/#/pages/Login/Login">xiaowu聊天登录</a>
        `
    }).then(res => {
        res.send('发送成功')
    }).catch(err => {
        console.log('err了', err);
        res.send(err)
    })
   
})

// 登录
router.get('/getInfo',async  (req, res) => {
    const result = await getUserService(req)
    res.send(result)
})
// 用户列表
router.get('/getUserList',async  (req, res) => {
    const result = await getUserListService(req)
    res.send(result)
})


module.exports = router