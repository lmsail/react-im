import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Button, Row, Col, message } from 'antd'

import { initChatInfo } from '../../redux/actions'

class Profile extends Component {

    render() {
        const { friend } = this.props
        if (!friend) return null
        return (
            <div className="m-user-info">
                <div className="user-info-main">
                    <div className="basic-info border-b">
                        <div className="left">
                            <Avatar size={60} shape="square" src={friend.avatar} />
                        </div>
                        <div className="right">
                            <div className="user-name">{friend.remark}</div>
                            <div className="user-desc">昵称：{friend.name}</div>
                        </div>
                        <div className="clearfix" />
                    </div>
                    { this.getItemList() }
                    <div className="btn-operation">
                        <Button type="primary" block={true} onClick={this.sendMsg}>发送消息</Button>
                        <Button block={true} onClick={this.logOut}>注销账号</Button>
                    </div>
                </div>
            </div>
        )
    }

    sendMsg = () => {
        const { friend } = this.props
        this.props.initChatInfo(friend)
        // this.props.history.push('/')
    }

    logOut = () => {
        message.error('想走，门都没有')
    }

    getItemList = () => {
        const { friend } = this.props
        const itemList = [
            { itemName: "地区", itemValue: "江苏 淮安" },
            { itemName: "备注", itemValue: friend.remark },
            { itemName: "昵称", itemValue: friend.name },
            { itemName: "手机号", itemValue: "183***8888" },
            { itemName: "个性签名", itemValue: "我就是帅，你能有什么办法呢" },
        ]
        return itemList.map(item => (
            <Row className="user-item border-b" key={item.itemName}>
                <Col span={4}>{item.itemName}</Col>
                <Col span={20} style={{ textAlign: "right" }}>{item.itemValue}</Col>
            </Row>
        ))
    }
}

export default connect(
    state => ({friend: state.friend, chat: state.chat}), {initChatInfo}
)(withRouter(Profile))