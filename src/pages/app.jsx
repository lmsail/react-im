/**
 * 聊天应用骨架
 */
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import Cookies from 'js-cookie'

import LeftNav from '../components/left-nav'
import Routers from '../router'
import { connect } from '../utils/websocket'
 
export default class App extends Component {

    componentDidMount() {
        // 连接 socket 服务器
        connect()
    }

    render() {
        const screenType = Cookies.get('screenType')
        return (
            <Layout className={['container', screenType === 'fullscreen-exit' ? 'mini-pattern' : null].join(' ')}>
                <LeftNav />
                <Switch>
                    { Routers.map(item => <Route exact path={item.path} component={item.components} key={item.path} />) }
                    <Redirect to="/" />
                </Switch>
            </Layout>
        )
    }
}