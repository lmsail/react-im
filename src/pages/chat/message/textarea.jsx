import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Icon, Button, Input, Tooltip } from 'antd'

import { pushChatMsg, recvChatMsg, modifyContacts } from '../../../redux/actions'
// import { sendMsg } from '../../../utils/websocket'
import FaceEmjoy from '../../../components/message/face'

class ChatTextarea extends Component {

    state = { message: '', showFace: false }

    componentDidMount(){
        document.onclick = () => this.setState({ showFace: false })
    }

    componentWillUnmount() {
        document.onclick = null // 在组件卸载时，取消事件监听，防止内存泄漏
    }

    handleTextArea = (name, e) => {
        this.setState({ [name]: e.target.value })
    }

    render() {
        const { showFace } = this.state
        return (
            <section style={{ position: "relative" }}>
                <Row className="chat-tools">
                    <Col span={18}>
                        <Tooltip title="发送表情">
                            <Icon type="smile" onClick={e => this.showFace(e)} />
                        </Tooltip>
                        <Tooltip title="发送图片"><Icon type="picture" /></Tooltip>
                        <Tooltip title="发送代码片段"><Icon type="code" /></Tooltip>
                        <Tooltip title="发送链接"><Icon type="link" /></Tooltip>
                        <FaceEmjoy parent={ this } showFace={showFace} />
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                        <Tooltip title="视频聊天"><Icon type="video-camera" style={{ marginRight: 10 }} /></Tooltip>
                        <Tooltip title="截图"><Icon type="scissor" /></Tooltip>
                    </Col>
                </Row>
                <Input.TextArea className="chat-textarea"
                       onChange={e => this.handleTextArea('message', e) } placeholder="输入信息..."
                       onPressEnter={e => this.sendChatMess(e) }
                       value={this.state.message}
                />
                <Button style={{ float: "right" }} onClick={ e => this.sendChatMess(e) }>发送</Button>
            </section>
        )
    }

    showFace = e => {
        e.nativeEvent.stopImmediatePropagation()
        const {showFace} = this.state
        this.setState({ showFace: !showFace })
    }

    // 接收子组件传值
    getFaceItem = (object, faceEmjoy) => {
        let { message } = this.state
        message += faceEmjoy + " "
        this.setState({ message })
    }

    sendChatMess = e => {
        e.preventDefault();
        const { message } = this.state
        if(!message) return
        this.setState({ message: '' })

        // 推送socket消息
        const { chat: { chatUserInfo }} = this.props
        // sendMsg(message, chatUserInfo.id)

        // 这是自己的消息
        let { user: {userInfo, contacts} } = this.props
        this.props.pushChatMsg({
            id: userInfo.id,
            to_id: chatUserInfo.id,
            avatar: userInfo.avatar,
            message: message,
            position: "right"
        })

        const randomText = ["工具人一号为您服务～", `你好，我是${chatUserInfo.nickname}，很高兴认识你`, "oh god，你终于想起我了啊", "明天一起去爬山露营啊，有空吗？", "hello，我现在在工作，你呢？", "🌹🌹 怎么说呢，那就在一起吧～"]
        const lastMessage = randomText[parseInt(Math.random()*randomText.length)]
        this.props.recvChatMsg({
            id: chatUserInfo.id,
            to_id: userInfo.id,
            avatar: chatUserInfo.avatar,
            message: lastMessage,
            position: "left"
        })

        if(contacts) {
            const index = contacts.findIndex(user => user.id === chatUserInfo.id)
            if(index >= 0) {
                contacts[index].last_mess = lastMessage;
                contacts[index].time = "刚刚"
                if(index > 0) {
                    contacts.unshift(contacts.splice(index, 1)[0])
                }
                this.props.modifyContacts(contacts)
            }
        }
    }
}

export default connect(
    state => ({ chat: state.chat, user: state.user }),
    { pushChatMsg, recvChatMsg, modifyContacts }
)(ChatTextarea)
