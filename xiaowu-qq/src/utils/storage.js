export function setStorage(key,val) {
    try {
        uni.setStorageSync(key, val);
    } catch (e) {
        // error
        console.error(e);
    }
}
export function getStorage(key) {
    let val = ''
    try {
        val = uni.getStorageSync(key);
    } catch (e) {
        // error
        console.error(e);
    }
    return val
}