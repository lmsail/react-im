import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './pages/app'
import store from './redux/store'

import './assets/css/base.less'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
