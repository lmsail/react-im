import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Avatar, List, Button} from 'antd'

class NewFriend extends Component {

    render() {
        return (
            <div className="m-user-info">
                <h2 className="main-title">好友申请</h2>
                <div className="friend-list">{this.createMailListDom()}</div>
            </div>
        )
    }

    createMailListDom = () => {
        const statusTemp = {
            0: [<Button type="primary">接受</Button>, <Button type="danger">拒绝</Button>],
            1: ['已通过'],
            2: [<span style={{color: 'red'}}>已拒绝</span>]
        }
        let {friend: {newFriend}} = this.props
        if(newFriend === null) newFriend = []
        return (
            <div className="m-list-item">
                <List split={true} className="m-list-user" itemLayout="horizontal" dataSource={newFriend}
                      renderItem={user => (
                          <List.Item key={user.user_id} actions={statusTemp[user.status]}>
                              <List.Item.Meta
                                  avatar={<Avatar shape="square" size="large" style={{marginTop: 5}} src={user.avatar}/>}
                                  title={user.nickname} description={`附言：${user.remark}`}
                              />
                              <div style={{color: "#ccc"}}>{user.time}</div>
                          </List.Item>
                      )}
                />
            </div>
        )
    }
}

export default connect(
    state => ({friend: state.friend, chat: state.chat}), {}
)(withRouter(NewFriend))