import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import fetchUser from '../constants/fetchUser'

const FormItem = Form.Item

class SignUp extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, { username, password }) => {
      if (err) return
      fetchUser('signup', { username, password })
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              sign Up
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(SignUp)

export default WrappedNormalLoginForm
