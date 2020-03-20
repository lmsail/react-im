import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Avatar } from 'antd'

import InputSearch from './search'
import { getFriendInfo } from '../../redux/actions'
import mailList from '../../config/mailListConfig'

class UserList extends Component {

    state = { user_id: 0 }

    showUserInfo = user_id => {
        this.setState({ user_id})
        // this.props.getFriendInfo(user_id) /* 正式环境只传ID */
        this.props.getFriendInfo(this.getUserInfoById(user_id))
    }

    render() {
        return (
            <div className="mail-users">
                <div className="user-search"><InputSearch /></div>
                <div className="mail-list">{ this.createMailListDom() }</div>
            </div>
        )
    }

    // 取出指定用户信息
    getUserInfoById = user_id => {
        const users = Object.values(mailList).map(item => item.find(user => user.uid === user_id))
        return users.find(user => user && user.uid === user_id)
    }

    createMailListDom = () => {
        const { user_id } = this.state
        return Object.keys(mailList).map(key => (
            <div className="m-list-item" key={key}>
                <div className="m-list-title">{key}</div>
                <List
                    className="m-list-user"
                    itemLayout="horizontal"
                    dataSource={mailList[key]}
                    split={false}
                    renderItem={user => (
                        <List.Item 
                            className={ user_id === user.uid ? 'active' : null }
                            onClick={() => this.showUserInfo(user.uid)}
                        >
                            <List.Item.Meta 
                                avatar={<Avatar shape="square" size="large"  src={ user.avatar } />} 
                                title={`${user.remark} (${user.name})`} 
                            />
                        </List.Item>
                    )}
                />
            </div>
        ))
    }
}

export default connect(
    state => ({ friend: state.friend }),
    { getFriendInfo }
)(UserList)