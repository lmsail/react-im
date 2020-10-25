/**
 * socket 事件处理
 * -----------------------------------------------
 * 外部组件使用 redux 时，选择哪种方式？
 * 
 * import { setGlobalSocket } from '../redux/init'
 * 
 * 1、所有方法写到 redux 相关文件中
 *  eg：store.dispatch(setGlobalSocket(socket))
 * 
 * 2、直接使用 state 对象更改 redux 中的值
 *  const statr = store.getState();
 *  eg：state.globalData.socket = socket;
 * 
 * 第一种方式会触发页面重新渲染，第二种不会
 * -----------------------------------------------
 */
import store from '../redux/store'
import { setSocketObject, initMain, logout } from '../redux/actions'
import { message as AM } from 'antd'

// 连接成功
export const connect = socket => {
    // 连接成功，将 socket 对象写入 store 状态中，便于全局使用
    store.dispatch(setSocketObject(socket))
}

// 初始化事件
export const init = message => {
    console.log('收到 init 消息', message)
    store.dispatch(initMain(message.data))
}

// 进入聊天室事件
export const join = message => {
    console.log('系统消息 [join]', message)
}

// 收到消息事件
export const message = message => {
    console.log('系统消息 [message]', message)
}

// 授权验证失败事件
export const authError = () => {
    AM.error('登录信息已过期，请重新登录！')
    setTimeout(() => store.dispatch(logout()), 1000)
}

// 连接断开事件
export const disconnect = err => {
    console.log('socket连接断开事件', err)
}