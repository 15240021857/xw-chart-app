export function formatDate(stamp) {
    if(!stamp) {
        return stamp
    }
    // 获取传入时间， 当下时间， 进行比较，
    // 若是当天，显示 hh:mm
    // 若是昨天，显示 昨天 + hh:mm
    // 若是前天以前，显示 yy:mm:dd + hh:mm
    let timeFmt = ''
    const date = new Date(stamp)
    const now = new Date()

    const yy = date.getFullYear()
    const MM = date.getMonth()
    const dd = date.getDate()
    const hh = date.getHours()
    const mm = date.getMinutes()

    const nyy = now.getFullYear()
    const nMM = now.getMonth()
    const ndd = now.getDate()
    const nhh = now.getHours()
    const nmm = now.getMinutes()
    
    if(yy == nyy) {
        // 当天
        if(dd == ndd && MM ==nMM) {
            timeFmt = `${patch0(hh)}:${patch0(mm)}`
            console.log('formatDate',timeFmt);
            // 昨天
        } else if(dd + 1 == ndd && MM ==nMM) {
            timeFmt = `昨天 ${patch0(hh)}:${patch0(mm)}`
            // 昨天以前
        } else if(dd + 2 == ndd && MM ==nMM) {
            timeFmt = `前天 ${patch0(hh)}:${patch0(mm)}`
            // 昨天以前
        }  else {
            timeFmt = `${yy}-${MM + 1}-${dd} ${patch0(hh)}:${patch0(mm)}`
        }
    } else {
        timeFmt = `${yy}-${MM + 1}-${dd} ${patch0(hh)}:${patch0(mm)}`
    }
    return timeFmt
}
// 补0
function patch0 (n) {
    if(n>0 && n<10 ){
        return '0' + n
    } else {
        return n
    }
}
// 是否为空
export const isEmpty = (data) => {
  return data === null || data === undefined || data === "";
};