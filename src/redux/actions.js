/**
 * 对应 reducers 中的 action 同步/异步请求
 */
import {
    INIT_CHAT_INFO, RECEIVE_CHAT_MSG,
    CHANGE_RIGHT_TYPE, INIT_FRIEND_INFO
} from './action-type'

const initChatData   = chat => ({ type: INIT_CHAT_INFO, data: chat })
const receiveChatMsg = chat => ({ type: RECEIVE_CHAT_MSG, data: chat })
const showRightType  = chat => ({ type: CHANGE_RIGHT_TYPE, data: chat })
const showFriendInfo = friend => ({ type: INIT_FRIEND_INFO, data: friend })

// 初始化消息列表
export const initChatInfo = chatUserInfo => {
    return dispatch => {
        let messList = chatUserInfo.uid === 1 ? [
            {id: 1, avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", message: " 我这辈子最后悔的事情，就是创建阿里巴巴，我不喜欢钱，我对钱没有兴趣", position: "left"},
            {id: 2, avatar: "http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1583315718&t=9caf2bcbcf5ea34c543c426750bb1134", message: "嗯，我也是", position: "right"},
            {id: 3, avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", message: " 我这辈子最后悔的事情，就是创建阿里巴巴，我不喜欢钱，我对钱没有兴趣", position: "left"},
            {id: 4, avatar: "http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1583315718&t=9caf2bcbcf5ea34c543c426750bb1134", message: "嗯，我也是", position: "right"},
            {id: 5, avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", message: " 我这辈子最后悔的事情，就是创建阿里巴巴，我不喜欢钱，我对钱没有兴趣", position: "left"},
            {id: 6, avatar: "http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1583315718&t=9caf2bcbcf5ea34c543c426750bb1134", message: "嗯，我也是", position: "right"},
            {id: 7, avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", message: " 我这辈子最后悔的事情，就是创建阿里巴巴，我不喜欢钱，我对钱没有兴趣", position: "left"},
            {id: 8, avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", message: " 我这辈子最后悔的事情，就是创建阿里巴巴，我不喜欢钱，我对钱没有兴趣", position: "left"},
            {id: 9, avatar: "http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1583315718&t=9caf2bcbcf5ea34c543c426750bb1134", message: "嗯，我也是", position: "right"},
            {id: 10, avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", message: " 我这辈子最后悔的事情，就是创建阿里巴巴，我不喜欢钱，我对钱没有兴趣", position: "left"},
            {id: 11, avatar: "http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1583315718&t=9caf2bcbcf5ea34c543c426750bb1134", message: "嗯，我也是", position: "right"},
            {id: 12, avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", message: " 我这辈子最后悔的事情，就是创建阿里巴巴，我不喜欢钱，我对钱没有兴趣", position: "left"},
            {id: 13, avatar: "http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1583315718&t=9caf2bcbcf5ea34c543c426750bb1134", message: "好了好了，别说了", position: "right"},
        ] : []
        setTimeout(() => { dispatch(initChatData({ loading: false })) }, 1000)
        dispatch(initChatData({ chatUserInfo, messList, loading: true, showRightType: 'message' }))
    }
}

// 切换右侧显示状态
export const changeRightType = type => {
    return dispatch => {
        dispatch(showRightType({ showRightType: type }))
    }
}

// 发送消息
export const sendChatMsg = chat => {
    return dispatch => {
        dispatch(receiveChatMsg(chat))
    }
}

// 获取好友基本信息
export const getFriendInfo = friend_uid => {
    return dispatch => {
        /* 获取好友用户信息 */
        dispatch(changeRightType('userInfo'))
        dispatch(showFriendInfo(friend_uid))
    }
}