import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Avatar, Row, Col, Icon, Modal } from 'antd'

class MessHeader extends Component {

    state = { visible: false }

    render() {
        const { chat: { chatUserInfo: { avatar, name } }} = this.props
        return (
            <div>
                <Row>
                    <Col span={20}>
                        <Avatar shape="square" size={36} src={avatar} />
                        <span style={{ fontSize: 18, marginLeft: 10, color: "#000" }}>{name}</span>
                    </Col>
                    <Col span={4}>
                        <div style={{ textAlign: "right" }}>
                            <Icon type="more" rotate="90" className="icon-more" onClick={this.toggleModel} />
                        </div>
                    </Col>
                </Row>
                {this.createModel(name)}
            </div>
        )
    }

    toggleModel = () => {
        this.setState({ visible: !this.state.visible })
    }

    createModel = name => {
        const { visible } = this.state
        return (
            <Modal title={name} visible={visible}
                onOk={this.toggleModel}
                onCancel={this.toggleModel}
                okText="确认"
                cancelText="取消"
            >
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
            </Modal>
        )
    }
}

export default connect(
    state => ({ chat: state.chat }), {}
)(withRouter(MessHeader))