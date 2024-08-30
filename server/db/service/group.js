const { getGroupListDao, isGroupMemberDao } = require("../dao/group")

// 获取群列表 userId=''则返回全部
exports.getGroupListService = async (req) => {
    const {userId, keyword} = req.query
    try {
        const list = await getGroupListDao( {userId, keyword} )
        
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
// 是否成员
exports.isGroupMemberService = async (req) => {
    const {userId, groupId} = req.query
    try {
        const count = await isGroupMemberDao( {userId, groupId} )
        const isGroup = count > 0 ? true : false
        return {
            code: 200,
            data: isGroup,
            msg: isGroup? '群成员' : '非成员'
        }
    } catch (error) {
        return {
            code: 500,
            data: null,
            msg: error?.message || error
        }
    }
}