import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Avatar, Row, Col, Icon } from 'antd'

import { getFriendInfo } from '../../../redux/actions'

class MessHeader extends Component {

    render() {
        const { chat: { chatUserInfo: { avatar, nickname }, chatUserInfo }} = this.props
        return <Row>
            <Col span={20}>
                <Avatar shape="square" size={36} src={avatar} />
                <span style={{ fontSize: 18, marginLeft: 10, color: "#000" }}>{nickname}</span>
            </Col>
            <Col span={4}>
                <div style={{ textAlign: "right" }}>
                    <Icon type="more" rotate="90" className="icon-more" onClick={() => this.showUserInfo(chatUserInfo)} />
                </div>
            </Col>
       </Row>
    }

    showUserInfo = userInfo => {
        this.props.getFriendInfo(userInfo)
    }
}

export default connect(
    state => ({ chat: state.chat }), {getFriendInfo}
)(withRouter(MessHeader))