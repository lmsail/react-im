import { combineReducers } from 'redux'
import {
    INIT_CHAT_INFO, INIT_MESS_LIST, RECEIVE_CHAT_MSG, SEND_CHAT_MSG,
    CHANGE_RIGHT_TYPE, INIT_FRIEND_INFO, AUTH_SUCCESS, ERR_MSG,
    USERINFO, LOGOUT, MODIFY_USER_CONTACTS, GET_NEW_FRIENDS, GET_USER_MAILLIST,
    SET_GLOBAL_SOCKET, USERSEARCH_LIST, SET_REDIRECT_PATH
} from './action-type'
import { initUser, initChatInfo, friendInfo, initGlobalData } from './init'

// 全局对象
function globalData(state = initGlobalData, action) {
    switch (action.type) {
        case SET_GLOBAL_SOCKET: // 设置全局socket对象
            return { socket: action.data } 
        default:
            return state
    }
}

// 当前登录的用户信息
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data, ...state, msg: null, redirectTo: '/'}
        case USERINFO:
            const { userInfo, contacts } = action.data
            return contacts ? {...state, userInfo, contacts} : {...state, userInfo}
        case LOGOUT:
            return {...action.data, redirectTo: '/login'}
        case ERR_MSG:
            return {...state, msg: action.data, redirectTo: '/login'}
        case SET_REDIRECT_PATH:
            return { redirectTo: `${action.data}` }
        case USERSEARCH_LIST:
            return {...state, searchList: action.data}
        case MODIFY_USER_CONTACTS:
            return {...state, contacts: action.data.contacts}
        default:
            return state
    }
}

// 好友的用户基本信息
function friend(state = friendInfo, action) {
    switch (action.type) {
        case INIT_FRIEND_INFO:
            return {...state, info: action.data}
        case GET_NEW_FRIENDS:
            return {...state, newFriend: action.data}
        case GET_USER_MAILLIST:
            return {...state, mailList: action.data}
        default:
            return state
    }
}

// 当前查看的消息列表
function chat(state = initChatInfo, action) {
    switch (action.type) {
        case INIT_CHAT_INFO:
            return {...state, ...action.data}
        case INIT_MESS_LIST:
            return {...state, ...action.data}
        case SEND_CHAT_MSG:    /* 发送消息 */
        case RECEIVE_CHAT_MSG: /* 接收消息 */
            const chatMsg = action.data
            let messList = state.messList
            // key 的关系是：当前用户id + 好友id
            let key = action.type === SEND_CHAT_MSG ? `${chatMsg.id}${chatMsg.to_id}` : `${chatMsg.to_id}${chatMsg.id}`;
            messList[key] = messList[key] ? [...messList[key], chatMsg] : [chatMsg];
            return {
                chatUserInfo: state.chatUserInfo,
                messList
            }
        case CHANGE_RIGHT_TYPE:
            return {...state, ...action.data}
        default:
            return state
    }
}

export default combineReducers({
    user, chat, friend, globalData
})