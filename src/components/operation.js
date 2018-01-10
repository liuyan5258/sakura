import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Row, Button } from 'antd'

import fetchUser from '../constants/fetchUser'

class Operation extends PureComponent {
  state = {
    isLogin: false
  }
  componentDidMount() {
    fetchUser('valid').then(res => {
      this.setState({
        isLogin: res.status === 1
      })
    })
  }
  render() {
    const { isLogin } = this.state
    return (
      <Row type="flex" justify="end" style={{margin: '10px 0'}}>
        <Link to="/signUp"><Button icon="solution" size="small" style={{marginRight: 10}}>注册</Button></Link>
        {
          isLogin ? <Link to="/manage"><Button icon="user" size="small">后台管理</Button></Link> : <Link to="/login"><Button icon="user" size="small">管理员登录</Button></Link>
        }
      </Row>
    )
  }
}

export default Operation
