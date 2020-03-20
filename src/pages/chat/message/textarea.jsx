import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Icon, Button, Input, message as AM } from 'antd'

import { sendChatMsg } from '../../../redux/actions'
import { sendMsg } from '../../../utils/websocket'

class ChatTextarea extends Component {

    state = { message: '' }

    handleTextArea = (name, e) => {
        this.setState({ [name]: e.target.value })
    }

    sendChatMess = e => {
        e.preventDefault();
        const { message } = this.state
        if(!message) {
            AM.error('不能发送空字符')
            return
        }
        this.setState({ message: '' })
        const { user } = this.props
        const msgData = {
            id: user.user_id,
            avatar: user.avatar,
            message: message,
            position: "right"
        }
        sendMsg(message)
        this.props.sendChatMsg(msgData)
    }

    render() {
        return (
            <div>
                <div className="chat-tools">
                    <Row>
                        <Col span={18}>
                            <Icon type="smile" style={{ marginLeft: 5, marginRight: 10 }} />
                            <Icon type="folder" />
                        </Col>
                        <Col span={6} style={{ textAlign: "right" }}>
                            <Icon type="video-camera" style={{ marginRight: 10 }} />
                            <Icon type="download" />
                        </Col>
                    </Row>
                </div>
                <Input.TextArea className="chat-textarea"
                       onChange={e => { this.handleTextArea('message', e) }} placeholder="输入信息..."
                       onPressEnter={(e) => { this.sendChatMess(e) }}
                       value={this.state.message}
                />
                <Button style={{ float: "right" }} onClick={ () => { this.sendChatMess() }}>Enter</Button>
            </div>
        )
    }
}

export default connect(
    state => ({ chat: state.chat, user: state.user }),
    { sendChatMsg }
)(ChatTextarea)