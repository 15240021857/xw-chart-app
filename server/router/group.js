const express = require('express')
const { getGroupListService, isGroupMemberService } = require('../db/service/group')
const router = express.Router()

const root = '/group'

// 群列表
router.get('/getGroupList', async (req, res) => {
    try {
        const result = await getGroupListService(req)
        res.send(result)
    } catch (error) {
        console.log(error);
    }
    
})
// 是否群成员
router.get('/isGroupMember', async (req, res) => {
    try {
        const result = await isGroupMemberService(req)
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})
module.exports = router