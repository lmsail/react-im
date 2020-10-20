import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import { login } from '../../redux/actions'
import ReactLogo from '../../assets/images/about/react.png'

class Login extends Component {

    render() {
        const { form: { getFieldDecorator }, user: { redirectTo, msg } } = this.props
        if (redirectTo) {
            if (redirectTo === '/login') window.location.reload()
            return <Redirect to={redirectTo} />
        }
        return (
            <div className="login-box">
                <div className="login-logo">
                    <img src={ReactLogo} alt="" />
                    <h1 className="">IM USER LOGIN</h1>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <Form.Item style={{ marginBottom: 15 }}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入账号!' }],
                        })(
                            <Input
                                size="large" placeholder="用户名"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 5 }}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password" size="large" placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 5 }}><Checkbox defaultChecked>记住我</Checkbox></Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" block>登录</Button>
                        <Button type="default" size="large" block onClick={this.register} style={{ marginTop: 15 }}>没有账号？注册</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password)
            }
        })
    }

    register = () => {
        this.props.history.push({pathname: '/register'})
    }
}

export default connect(
    state => ({ user: state.user }), { login }
)(Form.create({ name: 'normal_login' })(Login))
