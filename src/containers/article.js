import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchArticle } from '../redux/modules/article'

class Article extends PureComponent {
  componentDidMount() {
    const { title } = this.props
    this.props.fetchArticle({ title })
  }
  componentWillReceiveProps(nextProps) {
    const { title } = nextProps
    if (this.props.title !== title) {
      this.props.fetchArticle({ title })
    }
  }
  render() {
    const { data, title } = this.props
    function createMarkup() {
      return {__html: `<h2>${title}</h2>${data}`}
    }
    return <div className="main-body" dangerouslySetInnerHTML={createMarkup()} />
  }
}

export default connect(state => ({
  data: state.article.data
}), {
  fetchArticle
})(Article)
