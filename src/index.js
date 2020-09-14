import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import App from './containers/app'
import Login from './containers/login/login'

import './assets/css/base.less'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route component={App} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
