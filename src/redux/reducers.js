import { combineReducers } from 'redux'

import {
    INIT_CHAT_INFO, INIT_MESS_LIST, RECEIVE_CHAT_MSG,
    CHANGE_RIGHT_TYPE, INIT_FRIEND_INFO
} from './action-type'

import { initUser, initChatInfo, friendInfo } from './init'

// 当前登录的用户信息
function user(state = initUser, action) {
    return state
}

// 好友的用户基本信息
function friend(state = friendInfo, action) {
    switch (action.type) {
        case INIT_FRIEND_INFO:
            return {...state, ...action.data}
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
        case RECEIVE_CHAT_MSG: /* 接收消息 */
            const chatMsg = action.data
            return {
                chatUserInfo: state.chatUserInfo,
                messList: [...state.messList, chatMsg],
            }
        case CHANGE_RIGHT_TYPE:
            return {...state, ...action.data}
        default:
            return state
    }
}

export default combineReducers({
    user, chat, friend
})