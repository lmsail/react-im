import React, { Component } from 'react'
import { List, Skeleton, Avatar, Badge } from 'antd'
import { connect } from 'react-redux'
import InputSearch from './search'

import { initChatInfo } from '../../../redux/actions'

class Contacts extends Component {

    state = {
        initLoading: true,
        loading: false,
        list: [],
    }

    componentDidMount() {
        this.getData(res => {
            this.setState({
                initLoading: false,
                list: res
            })
        })
    }

    render() {
        const { initLoading, list } = this.state
        const { chat: { chatUserInfo } } = this.props
        const { uid } = chatUserInfo
        return (
            <div>
                <div className="user-search"><InputSearch /></div>
                <List className="conversation-list" loading={initLoading} itemLayout="horizontal"
                      split={false} dataSource={list} renderItem={item =>
                    (
                        <List.Item 
                            className={item.uid === uid ? 'active' : null}
                            onClick={ () => this.showMessageByUid(item.uid) }
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Badge count={item.unread}>
                                            <Avatar shape="square" size="large" src={item.avatar} />
                                        </Badge>
                                    }
                                    title={item.name}
                                    description={item.last}
                                />
                                <div className="timeDate">02-24</div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    showMessageByUid = uid => {
        const { list } = this.state
        const index = list.findIndex(item => item.uid === uid)
        list[index].unread = 0
        this.props.initChatInfo(list[index])
    }

    getData = callback => {
        const res = [
            { uid: 1, "name": "马云", "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778785114&di=4bf0a9cbe00cd200465af9fe46b3091e&imgtype=0&src=http%3A%2F%2Fwww.56ec.org.cn%2Fd%2Ffile%2Fnews%2Frwgd%2F2017-05-15%2Fa26c40ec7d83c66d78ad6f791952a01b.jpg", "last":"明天 9:00 准时到哦", unread: 10 },
            { uid: 2, "name": "王健林", "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778837077&di=f569a7c9412eae7b1068ee89ccc9aa9f&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170709%2Fc266207e9ec74666b4dee5f74c634ae1_th.jpg", "last":"什么？这是什么意思", unread: 300 },
            { uid: 3, "name": "马化腾", "avatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1448222705,364131329&fm=26&gp=0.jpg", "last":"今天，你充钱了吗？", unread: 1 },
            { uid: 4, "name": "巴菲特", "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778875578&di=e01fad34bb5d118d8f2a3b4d330b0482&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170518%2F4fbdc7b308224171b7eb127ef241d211_th.jpg", "last":"明天一起吃饭啊", unread: 5 },
            { uid: 5, "name": "刘亦菲", "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778899824&di=86416b5c424eec83f25460f53223cded&imgtype=0&src=http%3A%2F%2Fwx3.sinaimg.cn%2Fbmiddle%2F69949546ly1gaxecjgu3gj20u00mi495.jpg", "last":"今天拍了宣传照，快去看看吧", unread: 1 },
            { uid: 6, "name": "刘强东", "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778918134&di=a1a98d63733b3abf50a7bf2833061a71&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3934483023%2C600439244%26fm%3D214%26gp%3D0.jpg", "last":"我脸盲，我不知道她漂不漂亮", unread: 1 },
            { uid: 7, "name": "李彦宏", "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778934832&di=0696ccada3b7bd6be113536edcfe567f&imgtype=0&src=http%3A%2F%2Fimage.woshipm.com%2Fwp-files%2F2014%2F05%2F0035.jpg", "last":"百度AI人工智能，造福人类，哈哈哈", unread: 100 },
            { uid: 8, "name": "雷军", "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582780482194&di=aab09c98f3d82137079cba7fe267b0dc&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20180618%2Fa329dc911c83460b9e16f2a5cc2db364_th.jpg", "last":"小米，永远相信美好的事情即将发生", unread: 128 },
        ]
        callback(res)
        // setTimeout(() => callback(res), 0)
    }
}

export default connect(
    state => ({ chat: state.chat }),
    { initChatInfo }
)(Contacts)