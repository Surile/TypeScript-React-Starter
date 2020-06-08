import axios, {AxiosRequestConfig, AxiosInstance, AxiosResponse} from 'axios'
import {createBrowserHistory} from 'history'
import {TokenName, baseURL} from '@/utils/consts'
import {notification} from 'antd'

const defaultOptions: AxiosRequestConfig = {
    baseURL: baseURL,
    timeout: 6000,
    timeoutErrorMessage: '连接超时，请稍后再试~',
}

class Http {
    static instance: Http

    request: AxiosInstance

    constructor(public history: any, options: AxiosRequestConfig) {
        this.request = axios.create(options)
        this.initInterceptors()
    }

    static getInstance(history = createBrowserHistory(), options = defaultOptions) {
        if (!this.instance) {
            this.instance = new Http(history, options)
        }
        return this.instance
    }

    initInterceptors() {
        this.request.interceptors.request.use((config: AxiosRequestConfig) => {
            const token = localStorage.getItem(TokenName)
            if (token) {
                config.headers.token = `${token}`
            }
            return config
        })

        this.request.interceptors.response.use(
            (res: AxiosResponse<any>) => {
                if (res.data.code === 10001) {
                    localStorage.removeItem(TokenName)
                    this.history.replace('/login')
                }
                return res.data
            },
            err => {
                return err
            },
        )
    }

    get(url: string, params?: object) {
        return this.request(url, {
            method: 'get',
            params,
        })
    }

    post(url: string, data?: object) {
        return this.request(url, {
            method: 'post',
            data: data,
        })
    }
}

export default Http.getInstance()
