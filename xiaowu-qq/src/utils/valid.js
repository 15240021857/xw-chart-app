// 校验邮箱
export function validEmail(val) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(val)
}
// uni-forms rules validateFunction
// 邮箱
export function validEmailFun(rule, value, data, callback) {
    if(!validEmail(value)) {
        callback('无效的邮箱')
    }
    return true
}
// 用户名
export function validUsernameFun(rule, value, data, callback) {  
    var regex = /^[a-zA-Z0-9]{6,10}$/;  
    if(!regex.test(value)) {
        callback('无效的用户名')
    }
    return true
}
// 密码
export function validPasswordFun(rule, value, data, callback) {  
    if(!(value && value.length >= 6)) {
        callback('密码长度需大于6')
    }
    return true
}