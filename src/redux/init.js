// 存储当前登录用户信息
import {
    CHANGE_RIGHT_TYPE, INIT_CHAT_INFO, INIT_FRIEND_INFO, RECEIVE_CHAT_MSG, SEND_CHAT_MSG,
    AUTH_SUCCESS, ERR_MSG, USERINFO, LOGOUT, MODIFY_USER_CONTACTS, GET_NEW_FRIENDS,
    GET_USER_MAILLIST
} from "./action-type";

export const initUser = {
    userInfo: {},
    msg: '',
    redirectTo: '',
    token: null,
    contacts: []
}

// 存储聊天信息等
export const initChatInfo = {
    loading: true,
    messList: {}, // 存放用户聊天记录
    chatUserInfo: {},
    showRightType: 'welcome', /* 右侧显示内容 */
}

// 存储当前点击的用户信息
export const friendInfo = {
    newFriend: [],
    mailList: [],
    info: {}
}

// 同步 Action
export const initChatData = chat => ({type: INIT_CHAT_INFO, data: chat})
export const sendChatMsg = chat => ({type: SEND_CHAT_MSG, data: chat})
export const receiveChatMsg = chat => ({type: RECEIVE_CHAT_MSG, data: chat})
export const showRightType = chat => ({type: CHANGE_RIGHT_TYPE, data: chat})
export const showFriendInfo = friend => ({type: INIT_FRIEND_INFO, data: friend})
// 用户相关
export const authSuccess = user => ({type: AUTH_SUCCESS, data: user})
export const userInfo = user => ({type: USERINFO, data: user})
export const logOut = user => ({type: LOGOUT, data: user})
export const errMsg = msg => ({type: ERR_MSG, data: msg})
// 更新用户会话列表
export const modifyUserContacts = user => ({type: MODIFY_USER_CONTACTS, data: user})
// 获取好友申请列表
export const getNewFriends = list => ({type: GET_NEW_FRIENDS, data: list})
// 获取好友通讯录列表
export const getMailList = list => ({type: GET_USER_MAILLIST, data: list})