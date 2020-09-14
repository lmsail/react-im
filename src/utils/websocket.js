import { message as AM, notification } from 'antd'

import store from '../redux/store'
import { modifyContacts } from '../redux/actions'

let socket = null

function websocket(user) {
    socket = new WebSocket("ws://127.0.0.1:8008/im")
    socket.onopen = () => {
        socket.send(JSON.stringify({
            "type": "login",
            "uuid": user.id.toString(),
            "content": "Hello Go WebSocket",
            "username": user.nickname
        }))
    }

    socket.onmessage = msg => {
        const data = JSON.parse(msg.data)
        const { username, content, touuid } = data
        console.log(data)
        switch (data.type) {
            case "init":
                break
            case "login":
                //notification['success']({ message: `${data.username} 已连接` })
                break
            case "message":
                AM.success(`message：${username}: ${content}`)
                break
            case "private":
                var contacts = store.getState().user.contacts
                if(touuid === user.id.toString()) {
                    const findIndex = contacts.findIndex(item => item.uid.toString() === touuid)
                    if(findIndex !== -1) {
                        contacts[findIndex].last = content.replace(/@\S+/, ' ')
                        if(store.getState().chat.chatUserInfo.uid === parseInt(touuid)) {
                            contacts[findIndex].unread = 0
                        } else {
                            contacts[findIndex].unread++
                        }
                    }
                    // 待完善。。。
                    store.dispatch(modifyContacts(contacts))
                }
                break
            case "logout":
                notification['error']({ message: `${data.username} 已退出连接` })
                AM.success(data.uuid + "已下线")
                break
            default:
                break
        }
    }

    socket.onclose = event => {
        // notification['error']({ message: `服务器已断开连接` });
        console.log("Socket Closed Connection: ", event)
    }

    socket.onerror = error => {
        notification['error']({ message: `服务器已断开连接` });
    }
}

// 发送好友消息
const sendMsg = (msg, friend_id) => {
    console.log("sending msg:", msg)
    socket.send(JSON.stringify({
        type: "friendMessage",
        data: {
            to_uid: friend_id, // 好友的ID
            message: msg
        }
    }))
}

export { websocket, sendMsg }