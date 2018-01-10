import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app'
import Login from '../components/login'
import SignUp from '../components/signUp'

const routes = (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={SignUp} />
  </Switch>
)

export default class Root extends PureComponent {
  render() {
    return <BrowserRouter>{routes}</BrowserRouter>
  }
}
