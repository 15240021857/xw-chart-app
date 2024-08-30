const { getTokenInfo } = require("../../utils/jwt")
const { getFriendListDao, isFriendDao, addFriendDao } = require("../dao/friend")

// 获取朋友列表 userId=''则返回全部
exports.getFriendListService = async (req) => {
    const {userId, keyword} = req.query
    try {
        let list = await getFriendListDao( {userId, keyword} )
        return {
            code: 200,
            data: list
        }
    } catch (error) {
        return {
            code: 500,
            msg: error?.message || error
        }
    }
}
// 是否朋友
exports.isFriendService = async (req) => {
    const {userId, friendId} = req.query
    try {
        const count = await isFriendDao( {userId, friendId} )
        const isFriend = count > 0 ? true : false
        return {
            code: 200,
            data: isFriend,
            msg: isFriend? '好友关系' : '非好友'
        }
    } catch (error) {
        return {
            code: 500,
            data: null,
            msg: error?.message || error
        }
    }
}
// 判断多个用户是否为好友 userId是本人id， friendIds是其他用户id数组
exports.arrIsFriendService = async (req) => {
    const {userId, friendIds} = req.query
    if(friendIds) {
        try {
            let arr = friendIds.split(',')
            let obj = {}
            for(let friendId of arr) {
                // 此处异步返回有问题
                const count = await isFriendDao( {userId, friendId} )
                const isFriend = count > 0 ? true : false
                obj[friendId] = isFriend
            }
            return {
                code: 200,
                data: obj,
                msg: '用户好友关系数组'
            }
        } catch (error) {
            return {
                code: 500,
                data: null,
                msg: error?.message || error
            }
        }
        
    }
}
// 添加好友 userId本人， friendId朋友
exports.addFriendService = async (req) => {
    const {userId, friendId} = req.body
    try {
        const list = await addFriendDao( {userId, friendId} )
        return {
            code: 200,
            data: list
        }
    } catch (error) {
        return {
            code: 500,
            msg: error?.message || error
        }
    }
}