import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import ReactLogo from '../../assets/images/about/react.png'
import { login } from '../../redux/actions'

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password)
            }
        })
    }

    render() {
        const { form: { getFieldDecorator }, user: { redirectTo, msg } } = this.props
        const Item = Form.Item
        if (redirectTo) {
            if (redirectTo === '/login') window.location.reload()
            return <Redirect to={redirectTo} />
        }
        return (
            <div className="login-box">
                <div className="login-logo">
                    <img src={ReactLogo} alt="" />
                    <h1 className="">React-Im</h1>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                size="large" placeholder="用户名"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />,
                        )}
                    </Item>
                    <Item style={{ marginBottom: 5 }}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password" size="large" placeholder="密码"
                            />,
                        )}
                    </Item>
                    <Item style={{ marginBottom: 5 }}><Checkbox defaultChecked>记住我</Checkbox></Item>
                    <Item>
                        <Button type="primary" size="large" htmlType="submit" block>登录</Button>
                    </Item>
                </Form>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }), { login }
)(Form.create({ name: 'normal_login' })(Login))