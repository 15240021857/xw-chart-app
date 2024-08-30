const bcrypt = require('bcryptjs');

// 加密
const ecodeFun = (psw) => {
    const saltRounds = 10
    const hashedPsw = bcrypt.hashSync(psw, saltRounds)
    return hashedPsw
}
// 比较 验证
const compareFun = (inputPsw, hashedPsw) => {
    const compareFlag = bcrypt.compareSync(inputPsw, hashedPsw)
    return compareFlag
}
module.exports = {
    ecodeFun,
    compareFun
}