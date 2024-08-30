const {  GroupModel } = require("../model")

// 查某用户的群列表，userId为空时，返回全部群 
exports.getGroupListDao = ({userId, keyword}) => {
    let whereStr = {}
    userId && (whereStr['userId'] = userId)
    // 名模糊查询
    keyword && (whereStr['groupName'] = {$regex: keyword, $options: 'i'})
    // const out = {userId: 1, userName: 1, imgUrl: 1}
    return new Promise((resolve, reject) =>{
        // 查找存在个数
        GroupModel.find(whereStr)
        .then(data => {
            console.log('dao找到群', data);
            // 交给service
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
// 查是否为群成员
exports.isGroupMemberDao = ({userId, groupId}) => {
    let whereStr = {
        $and: [
            {userId},
            {groupId}
        ]
    }
    // const out = {userId: 1, userName: 1, imgUrl: 1}
    return new Promise((resolve, reject) =>{
        // 查找存在个数
        FriendModel.countDocuments(whereStr)
        .then(data => {
            // 1个即是好友，0不是
            console.log('dao有一个就算群成员', data);
            // 交给service
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}