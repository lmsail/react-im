import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Input, List, Avatar, Divider, Button} from 'antd'

class NewFriend extends Component {

    state = {
        data: [
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
            {title: '赵露思'},
        ]
    }

    render() {
        const { data } = this.state
        return (
            <div className="m-user-info">
                <h2 className="main-title">添加好友</h2>
                <div className="friend-list">
                    <Input.Search placeholder="好友ID/昵称/手机号" enterButton="查找"
                                  value="赵露思" size="large" onSearch={value => console.log(value)}
                    />
                    <Divider orientation="left">本次搜索结果</Divider>
                    <List className="add-friend" itemLayout="horizontal" dataSource={data} split={false}
                          renderItem={item => (
                              <List.Item actions={[<Button type="primary">添加好友</Button>]}>
                                  <List.Item.Meta
                                      avatar={<Avatar shape="square" size="large" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2714458446,426719835&fm=26&gp=0.jpg" />}
                                      title={item.title}
                                      description="这里显示的是对方的个性签名或者个人介绍"
                                  />
                              </List.Item>
                          )}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({friend: state.friend, chat: state.chat}), {}
)(withRouter(NewFriend))