import { requestFun } from "@/utils/request";

// 群列表
export function getGroupListApi(data) {
    return requestFun({
        url: '/group/getGroupList',
        method: 'get',
        data
    })
}
// 是否组成员
export function isGroupMemberApi(data) {
    return requestFun({
        url: '/group/isGroupMember',
        method: 'get',
        data
    })
}