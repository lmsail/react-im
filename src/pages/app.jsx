/**
 * 聊天应用骨架
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Layout} from 'antd'
import Cookies from 'js-cookie'

import {initMain} from '../redux/actions'

import LeftNav from '../components/left-nav'
import Routers from '../router'

class App extends Component {

    state = { screenType: null, token: null, pathName: null }

    componentWillMount() {
        const screenType = Cookies.get('screenType')
        const { pathname } = this.props.location
        this.setState({ screenType, pathName: pathname })
    }

    componentDidMount() {
        const token = Cookies.get('token')
        if (token) {
            this.setState({ token })
            this.props.initMain(token)
        }
    }

    render() {
        const { token, pathName } = this.state
        const { redirectTo } = this.props.user
        if(pathName === '/register') return <Redirect to='/register' />
        if (!token || redirectTo === '/login') return <Redirect to='/login' />
        return (
            <Layout className={['container', this.state.screenType === 'fullscreen-exit' ? 'mini-pattern' : null].join(' ')}>
                <LeftNav parent={this} />
                <Switch>
                    {Routers.map(item => <Route exact path={item.path} component={item.components} key={item.path}/>)}
                    <Redirect to='/' />
                </Switch>
            </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user}), {initMain}
)(App)
