const express = require('express')
const { getFriendListService, isFriendService, arrIsFriendService, addFriendService } = require('../db/service/friend')
const router = express.Router()

const root = '/friend'

// 朋友列表
router.get('/getFriendList', async (req, res) => {
    const result = await getFriendListService(req)
    res.send(result)
})
// 是否朋友
router.get('/isFriend', async (req, res) => {
    const result = await isFriendService(req)
    res.send(result)
})
// 多个用户是否为您朋友
router.get('/arrIsFriend', async (req, res) => {
    const result = await arrIsFriendService(req)
    res.send(result)
})
// 添加朋友
router.post('/addFriend', async (req, res) => {
    const result = await addFriendService(req)
    res.send(result)
})
module.exports = router