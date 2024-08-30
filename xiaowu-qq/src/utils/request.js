import { useUserStore } from "@/stores/userStore"

const rootApi = 'http://192.168.10.6:3001'
// 封装请求
export function requestFun(options) {
    const useStore = useUserStore()
    const token = useStore?.tokenGet
    options.header = options.header || {}
    return new Promise((resolve, reject) => {
        // options['header'] = options?.header || {}
        if(token) {
            options.header.Authorization = 'Bearer ' + token
        }
        
        // if (options.method?.toLowerCase() == 'post') {
        //     options.header['Content-Type'] = 'application/json'
        // }
        
        console.log('options',options);
        uni.request({
            ...options,
            url: rootApi + options.url,
            success: (res) => {
                console.log(res.data);
                const code = res?.data?.code 
                if(code !== 200) {
                    switch (code) {
                        // token过期 以后改为无感刷新
                        case 401:
                            console.error(res?.data?.msg);
                            uni.navigateTo({ url: '/pages/Login/Login' })
                            break;
                        // 无效token
                        case 403:
                            console.error(res?.data?.msg);
                            uni.navigateTo({ url: '/pages/Login/Login' })
                            break;
                        default:
                            uni.showToast({
                                title: res?.data?.msg || '操作失败',
                                icon: 'none'
                            })
                    }
                }
                resolve(res?.data)
            },
            fail: (error) => {
                uni.showToast({
                    title: error?.message
                })
                console.error(error);
                reject(error)
            }
        })
    })
    
}