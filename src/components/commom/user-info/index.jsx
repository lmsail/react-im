import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Avatar, Row, Col, Button, Modal, message as AM, Icon, Upload } from 'antd'
import { logout } from '../../../redux/actions'

import './user-info.less'

class UserInfo extends Component {

    state = {visible: false}

    render() {
        const {userInfo} = this.props.user
        return (
            <div>
                <div className="basic-info border-b">
                    <div className="left">
                        <Avatar size={60} shape="square" src={userInfo.avatar} />
                        <div className="edit-avatar" onClick={() => this.changeModalStatus(true)}><Icon type="cloud-upload" /></div>
                    </div>
                    <div className="right">
                        <div className="user-name">{userInfo.nickname}</div>
                        <div className="user-desc">手机号：183***8888</div>
                    </div>
                    <div className="clearfix"/>
                </div>
                {this.getItemList()}
                <div className="btn-operation">
                    <Button type="danger" block={true} onClick={() => this.logout()}>退出登录</Button>
                    <Button block={true}>注销账号</Button>
                </div>
                {this.createModal()}
            </div>
        )
    }

    createModal = () => {
        const {visible} = this.state
        return <Modal visible={visible} title="上传头像" footer={false}onCancel={() => this.changeModalStatus(false)}>
            <Upload.Dragger name="file" multiple={false}>
                <p className="ant-upload-drag-icon">
                    <Icon type="cloud-upload" />
                </p>
                <p className="ant-upload-text">点击这里上传头像</p>
            </Upload.Dragger>
        </Modal>
    }

    changeModalStatus = visible => {
        this.setState({ visible })
    }

    getItemList = () => {
        const {user: {userInfo}} = this.props
        const itemList = [
            {itemName: "地区", itemValue: userInfo.area},
            {itemName: "昵称", itemValue: userInfo.nickname},
            {itemName: "手机号", itemValue: userInfo.phone},
            {itemName: "个性签名", itemValue: userInfo.autograph || '暂无'},
        ]
        return itemList.map((item, index) => (
            <Row className="user-item border-b" key={index}>
                <Col span={4}>{item.itemName}</Col>
                <Col span={20} style={{textAlign: "right", textIndent: 10}}>{item.itemValue}</Col>
            </Row>
        ))
    }

    logout = () => {
        const self = this
        Modal.confirm({
            title: '确定退出当前帐号吗？退出后无法接收在线消息哦！',
            content: '聊天记录不受影响，再次上线会自动推送离线消息',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                AM.loading('正在为您退出，请稍候...', 0);
                setTimeout(() => self.props.logout(), 1000)
            },
        });
    }
}

export default connect(
    state => ({user: state.user}), {logout}
)(withRouter(UserInfo))
