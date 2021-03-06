import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Link, withRouter } from 'react-router-dom'
import { Avatar, Icon, Menu, Layout, Badge } from 'antd'

import menuList from '../../config/menuConfig'
const { Sider } = Layout

class LeftNav extends Component {

    state = { screenType: 'fullscreen-exit' }

    componentWillMount() {
        this.menuDoms = this.getMenuDom()
    }

    componentDidMount() {
        this.resetFullScreen()
    }

    render() {
        const path = this.props.location.pathname
        const { user: { userInfo } } = this.props
        if (!userInfo) return null
        return (
            <Sider className="left-nav" defaultCollapsed="true" collapsedWidth="68">
                <h2 className="user-avatar" onClick={this.toSetting}>
                    <Avatar shape="square" size="large" icon="user" src={userInfo.avatar} />
                </h2>
                <div className="menus">
                    <Menu theme="dark" mode="inline" selectedKeys={[path]}>
                        { this.menuDoms }
                    </Menu>
                </div>
                {/* 全屏模式 */}
                <div className="setting" style={{ bottom: "90px"}} onClick={this.setFullScreen}>
                    <Icon type={this.state.screenType} />
                </div>
                <div className={['setting', path === '/setting' ? 'active' : null].join(' ')}
                     onClick={this.toSetting}
                >
                    <Icon type="setting" theme="filled" />
                </div>
            </Sider>
        )
    }

    getMenuDom = () => {
        return menuList.map(item => (
            <Menu.Item key={item.path} title={item.title}>
                <Link to={item.path}>
                    {
                        item.unread ?
                            <Badge dot={true}><Icon type={item.icon} /></Badge> :
                        <Icon type={item.icon} />
                    }
                </Link>
            </Menu.Item>
        ))
    }

    toSetting = () => {
        this.props.history.push({pathname: '/setting'})
    }

    resetFullScreen = () => {
        let screenType = Cookies.get('screenType')
        if(screenType) {
            screenType = screenType === 'fullscreen' ? 'fullscreen-exit' : 'fullscreen'
            this.setState({ screenType })
        }
    }

    setFullScreen = () => {
        const { screenType } = this.state
        Cookies.set('screenType', screenType)
        this.resetFullScreen()
        this.props.parent.setState({ screenType })
    }
}

export default connect(
    state => ({ user: state.user }), {}
)(withRouter(LeftNav))
