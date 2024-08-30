import { requestFun } from "@/utils/request";

// 好友列表
export function getFriendListApi(data) {
    return requestFun({
        url: '/friend/getFriendList',
        method: 'get',
        data
    })
}

// 是否好友 userId friendId
export function isFriendApi(data) {
    return requestFun({
        url: '/friend/isFriend',
        method: 'get',
        data
    })
}
// 多个用户是否好友 userId friendIds
export function arrIsFriendApi(data) {
    return requestFun({
        url: '/friend/arrIsFriend',
        method: 'get',
        data
    })
}
// 好友列表
export function addFriendApi(data) {
    return requestFun({
        url: '/friend/addFriend',
        method: 'post',
        data
    })
}