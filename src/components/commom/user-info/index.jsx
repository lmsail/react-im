/**
 * 用户信息组件，接收用户信息
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Avatar, Row, Col, Button, Modal, message as AM } from 'antd'

import './user-info.less'

class UserInfo extends Component {

    componentWillMount() {
        this.itemListDom = this.getItemList()
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <div className="basic-info border-b">
                    <div className="left">
                        <Avatar size={60} shape="square" src={user.avatar} />
                    </div>
                    <div className="right">
                        <div className="user-name">{user.nickname}</div>
                        <div className="user-desc">手机号：183***8888</div>
                    </div>
                    <div className="clearfix" />
                </div>
                { this.itemListDom }
                <div className="btn-operation">
                    <Button type="danger" block={true} onClick={() => this.logout()}>退出登录</Button>
                    <Button block={true}>注销账号</Button>
                </div>
            </div>
        )
    }

    logout = () => {
        Modal.confirm({
            title: '确定退出当前帐号吗？退出后无法接收在线消息哦！',
            content: '聊天记录不受影响，再次上线会自动推送离线消息',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                AM.success("点击了确认")
            },
            onCancel() {
                AM.error("点击了取消")
            },
        });
    }

    getItemList = () => {
        const { user } = this.props
        const itemList = [
            { itemName: "地区", itemValue: user.area },
            { itemName: "昵称", itemValue: user.nickname },
            { itemName: "手机号", itemValue: user.phone },
            { itemName: "个性签名", itemValue: user.autograph },
        ]
        return itemList.map((item, index) => (
            <Row className="user-item border-b" key={index}>
                <Col span={4}>{item.itemName}</Col>
                <Col span={20} style={{ textAlign: "right" }}>{item.itemValue}</Col>
            </Row>
        ))
    }
}

export default connect(
    state => ({ user: state.user }), {}
)(withRouter(UserInfo))