const { FriendModel, userModel } = require("../model")

// 查某用户的好友列表 
exports.getFriendListDao = ({userId, keyword}) => {
    // status: 1
    let whereStr = {}
    // 该用户的好友,有自己加别人,也有别人加自己.
    userId && (whereStr['$or'] = [{userId}, {friendId: userId}])
    // 好友名模糊查询
    keyword && (whereStr['friendName'] = {$regex: keyword, $options: 'i'})
    
    
    // const out = {userId: 1, userName: 1, imgUrl: 1}
    return new Promise((resolve, reject) =>{
        // 查找存在个数
        FriendModel.find(whereStr)
        .then(data => {
            console.log('dao找到好友', data);
            // 交给service
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
// 查是否为好友关系
exports.isFriendDao = ({userId, friendId}) => {
    let whereStr = {
        $and: [
            {userId},
            {friendId},
            // 1 已接受好友申请
            {status: 1}
        ]
    }
    // const out = {userId: 1, userName: 1, imgUrl: 1}
    return new Promise((resolve, reject) =>{
        // 查找存在个数
        FriendModel.countDocuments(whereStr)
        .then(data => {
            // 1个即是好友，0不是
            console.log('dao已接受好友个数', data);
            // 交给service
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
// 添加好友 
exports.addFriendDao = ({userId, friendId}) => {
    return new Promise(async (resolve, reject) =>{
        const whereStr = {
            userId: userId
        }
        
        try {
            // 查找当前用户
            const [curUser] = await userModel.find(whereStr)
            console.log('curUser',curUser, userId);
            
            // 添加好友关系到好友表
            const data = FriendModel.create({
                userId,
                friendId,
                // 修改用户名称和头像时，是否要同步过来？
                friendName: curUser?.userName,
                imgUrl: curUser?.imgUrl,
                markName: '', //add
                status: 0
            })
            console.log('dao添加好友', data);
            // 交给service
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
// 删除好友关系
deleteFriendDao = ({userId, friendId}) => {
    return new Promise(async (resolve, reject) =>{
        try {
            // 删除好友关系
            const data = FriendModel.deleteMany({
                friendId
            })
            console.log('dao找到删除好友', data);
            // 交给service
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}