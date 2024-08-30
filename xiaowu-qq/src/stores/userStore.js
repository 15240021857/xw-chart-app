import {defineStore} from 'pinia'
import { setStorage,getStorage } from '@/utils/storage';

// 用户状态
export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            access_token: '',
            userId: '',
            userName: '',
        }

    },
    getters: {
        // 获取token
        tokenGet: (state) => {
            return state.access_token || getStorage('access_token')
        },
        userIdGet: (state) => {
            return state.userId || getStorage('userId')
        },
    },
    actions: {
        setToken(payload) {
            console.log('设置成功',payload);
            this.access_token = payload
            setStorage('access_token', payload)
        },
        
        setUserId(payload) {
            console.log('设置成功',payload);
            this.userId = payload
            setStorage('userId', payload)
        },
    }
})