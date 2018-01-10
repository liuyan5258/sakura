import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'

import { postArticle } from '../redux/modules/article'
import Editor from '../components/editor'
import TagGroup from '../components/tagGroup'

const FormItem = Form.Item

class Post extends PureComponent {
  state = {
    firstClassify: {},
    secondClassify: {},
    content: ''
  }

  handleContent = (value) => {
    this.setState({
      content: value
    })
  }

  handleTag = (name, tag, checked) => {
    if (checked) {
      this.setState({
        [name]: tag
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { form, postArticle, history } = this.props
    const { firstClassify, secondClassify, content } = this.state
    form.validateFields((err, values) => {
      if (err) return
      postArticle({
        title: values.title,
        content,
        firstClassify,
        secondClassify
      }).then(res => {
        if (res.status === 1) {
          history.push('/')
        }
      })
    })
  }

  render() {
    const { form, classify } = this.props
    const { getFieldDecorator } = form
    const { firstClassify, secondClassify, content } = this.state
    const firstClassifyList = classify.map(({ id, name }) => {
      return { id, name }
    })
    const currentClassifyList = classify.filter(({ id }) => {
      return id === firstClassify.id
    })
    const secondClassifyList = currentClassifyList.length ? currentClassifyList[0].childList.filter(item => item !== null) : []
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem>
          {getFieldDecorator('title', {
            initialValue: ''
          })(
            <Input placeholder="请在这里输入标题" />
          )}
        </FormItem>
        <TagGroup name="firstClassify" value={firstClassify.name} list={firstClassifyList} handleTag={this.handleTag} />
        {
          firstClassify.name ? <TagGroup name="secondClassify" value={secondClassify.name} list={secondClassifyList} handleTag={this.handleTag} /> : null
        }
        <Editor content={content} handleContent={this.handleContent} />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default Form.create()(connect(state => ({
  classify: state.classify.data
}), {
  postArticle
})(Post))
