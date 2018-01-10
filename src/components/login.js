import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import fetchUser from '../constants/fetchUser'

const FormItem = Form.Item

class Login extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault()
    const self = this
    this.props.form.validateFields((err, { username, password }) => {
      if (err) return
      fetchUser('login', { username, password }).then((data) => {
        if (data.status === 1) {
          sessionStorage.setItem('__token__', data.token)
          sessionStorage.setItem('__username__', data.username)
          self.props.history.push('/')
        }
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login)

export default WrappedNormalLoginForm
