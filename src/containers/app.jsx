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

    state = {screenType: null}

    componentWillMount() {
        const screenType = Cookies.get('screenType')
        this.setState({screenType})
    }

    componentDidMount() {
        const token = Cookies.get('token')
        if (token) {
            this.props.initMain(token)
        }
    }

    render() {
        const token = Cookies.get('token')
        const {redirectTo} = this.props.user
        if (!token || redirectTo === '/login') return <Redirect to='/login'/>
        return (
            <Layout
                className={['container', this.state.screenType === 'fullscreen-exit' ? 'mini-pattern' : null].join(' ')}>
                <LeftNav/>
                <Switch>
                    {Routers.map(item => <Route exact path={item.path} component={item.components} key={item.path}/>)}
                    <Redirect to='/'/>
                </Switch>
            </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user}), {initMain}
)(App)