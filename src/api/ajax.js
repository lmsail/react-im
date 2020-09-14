/**
 * 能发送ajax请求的函数模块
 * 函数的返回值是promise对象
 */
import axios from 'axios'
import Cookies from 'js-cookie'

const baseUrl = ''
export default function ajax(url, data = {}, type = 'POST') {
    url = baseUrl + url
    data["token"] = Cookies.get('token')
    if (type === 'GET') {
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += `${key}=${data[key]}&`
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1)
        }
        return axios.get(url + '?' + paramStr)
    } else {
        return axios.post(url, data)
    }
}
