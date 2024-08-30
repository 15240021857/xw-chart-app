const express = require('express')
// 中间件
const {errorHandleMid, globalMidder, verifyTokenMid} = require('./middle.js')
// 连接数据库
require('./db/connectDB.js')
const userRouter = require('./router/user.js')
const friendRouter = require('./router/friend.js')
const groupRouter = require('./router/group.js')

const app = express()

const port = 3001
// 兼容post json数据
app.use(express.json())
// 全局中间件
app.use('*', globalMidder)
// 错误中间件
app.use(errorHandleMid)
// 全局验证token
app.use(verifyTokenMid)
// app.use('*', verifyTokenMid)
// 用户api
app.use('/user', userRouter)
// 朋友api
app.use('/friend',friendRouter)
// 群api
app.use('/group', groupRouter)
app.get('/test', (req, res) => {
    res.send('hello world')
})
// app.post('/post-test', (req, res) => {
//     console.log('post body', req.body);
//     console.log('post query', req.query);
//     console.log('post params', req.params);
//     res.send('hello world'+JSON.stringify(req.body))
// })



// 监听服务端口
app.listen(port, () => {
    console.log(`app is runing at http://192.168.10.6:${port}`);
})