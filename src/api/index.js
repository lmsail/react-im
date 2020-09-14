/*
包含了n个接口请求的函数的模块
函数返回值为: promise
 */
import ajax from './ajax'

// 登陆接口
export const reqLogin = ({username, password}) => ajax('/login', {username, password})

// 登陆接口
export const reqLogout = () => ajax('/logout', {})

// 获取用户信息
export const reqUserInfo = token => ajax('/user', {token})

// 获取群聊列表
// export const reqGroupList = token => ajax('/group', {token})

// 获取初始化信息（用户信息，历史会话列表）
export const reqUserChatDataInit = token => ajax('/init', {token})

// 获取用户通讯录列表
export const reqUserMailList = token => ajax('/friend/mail-list', {token})

// 获取好友申请列表
export const reqNewFriendList = token => ajax('/friend/rq-list', {token})