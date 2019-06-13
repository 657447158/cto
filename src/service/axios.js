import axios from 'axios'
import Toast from '@/components/toast'
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
    baseURL = '/otc'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://129.211.29.207:8082'
}
export default function ajax (p) {
    let options = Object.assign({
        baseURL: baseURL,
        type: 'POST',
        url: '',
        loading: true,
        params: {}
    }, p)
    return new Promise((resolve, reject) => {
        let t
        let timer
        if (timer) {
            clearTimeout(timer)
        }
        if (options.loading) {
            t = Toast({
                show: true,
                type: 'loading',
                duration: 1000000
            })
        }
		// 设置测试用token
        options.params.token = 'bSGRmLzC237iIIMIda/3sw9H+nUtTHlmTZu3gYKVRlTQ0aTkd8tO97oEu4uUAIKu6kT5VEqydFUDbJC8U7UXIQ=='
        axios({
            method: options.type,
            baseURL: options.baseURL,
            url: options.url,
            params: options.params
        }).then(response => {
            if (options.loading) {
                t.show = false
            }
            resolve(response.data)
        }).catch(error => {
            if (options.loading) {
                t.type = 'error'
                t.message = '服务器错误'
                timer = setTimeout(() => {
                    t.show = false
                }, 1000)
            }
            reject(error)
        })
    })
}