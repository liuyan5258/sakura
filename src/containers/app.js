import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import Operation from '../components/operation'
import Slider from '../components/slider'
import Article from './article'
import { fetchClassify } from '../redux/modules/classify'
import { getQueryString } from '../constants/utils'

class App extends PureComponent {
  state = {
    title: '本站使用说明书'
  }
  componentDidMount() {
    const { history } = this.props
    const title = getQueryString(history.location, 'title')
    if (title) {
      this.setState({ title })
    }
    this.props.fetchClassify()
  }
  handleMenu = (title) => {
    this.setState({ title })
  }
  render() {
    const { classify, history } = this.props
    const { title } = this.state
    return (
      <div className="App">
        <Row>
          <Col span={4} className="slider-menu">
            <Operation />
            <Slider data={classify} handleMenu={this.handleMenu} history={history} />
          </Col>
          <Col span={20}>
            <Article title={title} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({
  classify: state.classify.data
}), {
  fetchClassify
})(App)
