/**
 * 对应 reducers 中的 action 同步/异步请求
 */
import { message as AM } from 'antd'
import {
    initChatData, receiveChatMsg, sendChatMsg, showRightType, showFriendInfo, authSuccess,
    errMsg, userLoginInfo, logOut, modifyUserContacts, getNewFriends, getMailList, setGlobalSocket, searchUserList,
    setRdirectPath
} from './init'
import { 
    reqFriendVerify, reqFriendHandle, reqLogin, reqLogout, reqFriendList, reqFriendRemark, reqUpdateUinfo, reqUserInfo, 
    reqUserSearch, reqFriendAdd, reqRegister 
} from '../api'
import store from './store'
import { pySegSort, setItem, removeItem } from '../utils'

// 用户登录
export const login = (username, password) => {
    return async dispatch => {
        const response = (await reqLogin({username, password})).data
        if (response.code === 200) {
            setItem('token', response.data.token)
            dispatch(authSuccess(response.data))
        } else {
            dispatch(errMsg(response.message))
        }
    }
}

// 用户注册
export const register = (username, nickname, password) => {
    return async dispatch => {
        const response = (await reqRegister(username, nickname, password)).data
        if(response.code === 200) {
            AM.success(response.message)
            setTimeout(() => dispatch(setRdirectPath('/login')), 1000)
        } else {
            AM.error(response.message)
        }
    }
}

// 退出登录
export const logout = () => {
    return async dispatch => {
        const response = (await reqLogout()).data;
        if(response.code === 200) {
            removeItem('token'); dispatch(logOut())
        } else {
            AM.error(response.message)
        }
    }
}

/**
 * 界面信息初始化
 * { userInfo, sessionList, onlineFriend }
 * 当前用户信息 | 历史会话 | 在线的好友
 * @param {*} data 
 */
export const initMain = data => {
    const { userInfo, sessionList, mailList } = data
    return async dispatch => {
        dispatch(userLoginInfo({userInfo, contacts: sessionList}))
        dispatch(getMailList(pySegSort(mailList)))
    }
}

// 修改消息会话列表
export const modifyContacts = contacts => {
    return dispatch => {
        dispatch(modifyUserContacts({contacts}))
    }
}

// 初始化消息列表
export const initChatInfo = chatUserInfo => {
    return dispatch => {
        dispatch(initChatData({chatUserInfo, loading: false, showRightType: 'message'}))
    }
}

// 切换右侧显示状态
export const changeRightType = type => {
    return dispatch => {
        dispatch(showRightType({showRightType: type}))
    }
}

// 发送消息
export const pushChatMsg = chat => {
    return dispatch => {
        dispatch(sendChatMsg(chat))
    }
}

// 收到好友消息
export const recvChatMsg = chat => {
    return dispatch => {
        dispatch(receiveChatMsg(chat))
    }
}

// 设置好友基本信息
export const setFriendInfo = friendInfo => {
    return async dispatch => {
        await dispatch(changeRightType('userInfo'))
        await dispatch(showFriendInfo(friendInfo))
    }
}

// 获取用户通讯录列表
export const getFriendList = () => {
    return async dispatch => {
        const response = (await reqFriendList()).data
        if(response.code === 200) {
            dispatch(getMailList(pySegSort(response.data)))
        } else {
            AM.error(response.message)
        }
    }
}

// 获取好友申请列表
export const getNewFriendList = () => {
    return async dispatch => {
        const response = (await reqFriendVerify()).data
        if(response.code === 200) {
            dispatch(getNewFriends(response.data))
        } else {
            AM.error(response.message)
        }
    }
}

// 处理好友申请
export const handleFriendVerify = (friend_id, option) => {
    return async dispatch => {
        const response = (await reqFriendHandle({ friend_id, option })).data
        if(response.code === 200) {
            let { newFriend } = (store.getState()).friend
            newFriend.map(item => {
                if(item.user_id === friend_id) item.status = option
                return item
            })
            dispatch(getNewFriends(newFriend))
            dispatch(getFriendList())
        } else {
            AM.error(response.message)
        }
    }
}

// 更改好友备注
export const modifyFriendNickRemark = (friend_id, remark, info) => {
    return async dispatch => {
        const response = (await reqFriendRemark({ friend_id, remark })).data
        if(response.code === 200) {
            info.nick_remark = remark
            dispatch(getFriendList())
            dispatch(showFriendInfo(info))
        } else {
            AM.error(response.message)
        }
    }
}

// 获取指定用户信息
export const getUserInfo = () => {
    return async dispatch => {
        const response = (await reqUserInfo()).data
        if(response.code === 200) {
            dispatch(userLoginInfo({userInfo: response.data}))
        } else {
            AM.error(response.message)
        }
    }
}

// 修改用户信息
export const modifyUserInfo = (fieldName, fieldValue) => {
    return async dispatch => {
        const response = (await reqUpdateUinfo({ fieldName, fieldValue })).data
        if(response.code === 200) {
            let { userInfo } = (store.getState()).user
            userInfo[fieldName] = fieldValue
            dispatch(userLoginInfo({ userInfo }))
        } else {
            AM.error(response.message)
        }
    }
}

// 搜索用户
export const findUserList = keyword => {
    return async dispatch => {
        const response = (await reqUserSearch(keyword)).data
        if(response.code === 200) {
            dispatch(searchUserList(response.data))
        } else {
            AM.error(response.message)
        }
    }
}

// 添加好友
export const addFriend = (friend_id, remark) => {
    return async dispatch => {
        const response = (await reqFriendAdd({ friend_id, remark })).data
        AM.error(response.message)
    }
}

export const setSocketObject = socket => {
    return async dispatch => {
        dispatch(setGlobalSocket(socket))
    }
}