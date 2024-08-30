import { requestFun } from "@/utils/request";

// 登录
export function loginApi(data) {
    return requestFun({
        url: '/user/login',
        method: 'post',
        data
    })
}
// 注册
export function registerApi(data) {
    return requestFun({
        url: '/user/register',
        method: 'post',
        data
    })
}
// 获取用户信息
export function getInfoApi(data) {
    return requestFun({
        url: '/user/getInfo',
        method: 'get',
        data
    })
}
// 用户名/邮箱是否已存在
export function userNameOrEmailExistsApi(data) {
    return requestFun({
        url: '/user/userNameOrEmailExists',
        method: 'get',
        data
    })
}
// 获取用户列表
export function getUserListApi(data) {
    return requestFun({
        url: '/user/getUserList',
        method: 'get',
        data
    })
}