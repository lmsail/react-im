/**
 * socketIO 实现与服务端交互
 */
import io from 'socket.io-client'
import { getItem } from '../utils'
import * as Event from './event'

export const MessServerConnect = () => {
    
    const socket = io.connect('http://127.0.0.1:8008', {
        query: `token=${getItem('token')}`,
        reconnection: true
    });
    
    socket.on('connect', () => Event.connect(socket)); // 连接事件
    
    socket.on('init', message => Event.init(message)); // 监听初始化事件
    
    socket.on('join', message => Event.join(message)); // 监听 join 事件
    
    socket.on('message', message => Event.message(message)); // 监听 message 事件
    
    socket.on('authError', () => Event.authError()); // 连接错误时返回
    
    socket.on('disconnect', err => Event.disconnect(err)); // 连接断开
}