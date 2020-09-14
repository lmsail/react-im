import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Avatar, Row, Col, Skeleton} from 'antd'

class Message extends Component {

    componentDidUpdate() {
        this.scrollToBottom()
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: 'auto'});
    }

    render() {
        const {chat: {loading}} = this.props
        return (
            <div>
                <Skeleton loading={loading} avatar={{shape: "square"}} active paragraph={{rows: 6}}>
                    {this.getMessList()}
                </Skeleton>
                <div ref={el => this.messagesEnd = el}/>
            </div>
        )
    }

    // 获取消息列表的 dom 结构
    getMessList = () => {
        let {chat: {messList, chatUserInfo}, user: {userInfo}} = this.props
        messList = messList[`${userInfo.id}${chatUserInfo.id}`]
        if(!messList) return null
        return messList.map((item, index) => {
            if (item.position === "left") {
                return <div key={index} className="message-item message-left">
                    <Row>
                        <Col span={1} style={{minWidth: "44px"}}>
                            <Avatar shape="square" src={item.avatar}/>
                        </Col>
                        <Col span={20}>
                            <div className="message">
                                <span>{item.message}</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            } else {
                return <div key={index} className="message-item message-right">
                    <div className="pull-left message">
                        <span>{item.message}</span>
                    </div>
                    <div className="pull-right">
                        <Avatar shape="square" src={item.avatar}/>
                    </div>
                    <div style={{clear: "both"}}/>
                </div>
            }
        })
    }
}

export default connect(
    state => ({chat: state.chat, user: state.user}), {}
)(Message)