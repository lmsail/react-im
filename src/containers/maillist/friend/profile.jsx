import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Avatar, Button, Row, Col} from 'antd'

import {initChatInfo, modifyContacts} from '../../../redux/actions'

class Profile extends Component {

    render() {
        const {friend: {info}} = this.props
        if (!info) return null
        return <div className="m-user-info">
            <div className="user-info-main">
                <div className="basic-info border-b">
                    <div className="left">
                        <Avatar size={60} shape="square" src={info.avatar}/>
                    </div>
                    <div className="right">
                        <div className="user-name">{info.nick_remark || info.nickname}</div>
                        <div className="user-desc">昵称：{info.nickname}</div>
                    </div>
                    <div className="clearfix"/>
                </div>
                {this.getItemList()}
                <div className="btn-operation">
                    <Button type="primary" block={true} onClick={this.openMessage}>发送消息</Button>
                    <Button type="danger" block={true}>移除好友</Button>
                </div>
            </div>
        </div>
    }

    openMessage = () => {
        let {friend: {info}, user: {contacts}} = this.props
        if(contacts) {
            const index = contacts.findIndex(user => user.id === info.id)
            if(index < 0) {
                info.time = "刚刚";  info.last_mess = "[快发送第一条消息吧]"; contacts.unshift(info)
                this.props.modifyContacts(contacts)
            }
        }
        this.props.initChatInfo(info)
        this.props.history.push({pathname: '/'})
    }

    getItemList = () => {
        const {friend: {info }} = this.props
        const itemList = [
            {itemName: "地区", itemValue: info.area || "江苏 淮安"},
            {itemName: "备注", itemValue: info.nick_remark || info.nickname},
            {itemName: "昵称", itemValue: info.nickname},
            {itemName: "手机号", itemValue: info.phone},
            {itemName: "个性签名", itemValue: info.autograph || '暂无'},
        ]
        return itemList.map(item => (
            <Row className="user-item border-b" key={item.itemName}>
                <Col span={4}>{item.itemName}</Col>
                <Col span={20} style={{textAlign: "right", textIndent: 10}}>{item.itemValue}</Col>
            </Row>
        ))
    }
}

export default connect(
    state => ({friend: state.friend, chat: state.chat, user: state.user}), {initChatInfo, modifyContacts}
)(withRouter(Profile))