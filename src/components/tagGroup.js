import React, { PureComponent } from 'react'
import { Tag, Input, Button } from 'antd'

const CheckableTag = Tag.CheckableTag

class TagGroup extends PureComponent {
  state = {
    tagList: [],
    inputVisible: false,
    inputValue: ''
  }

  componentDidMount() {
    this.setState({
      tagList: this.props.list
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleChange = (tag, checked) => {
    const { name } = this.props
    this.props.handleTag(name, tag, checked)
  }

  handleInputConfirm = () => {
    const state = this.state
    const inputValue = state.inputValue
    let tagList = state.tagList || []
    if (inputValue && tagList.indexOf(inputValue) === -1) {
      tagList = [...tagList, { id: tagList.length + 1, name: inputValue }]
    }
    this.setState({
      tagList,
      inputVisible: false,
      inputValue: ''
    })
  }

  saveInputRef = input => {
    this.input = input
  }

  render() {
    const { value, name } = this.props
    const { tagList, inputVisible, inputValue } = this.state
    return (
      <div className="classify-wrap">
        <strong style={{ marginRight: 8 }}>{name === 'firstClassify' ? '一级分类' : '二级分类'}：</strong>
        { tagList && tagList.length ? tagList.map((tag, index) => {
          const { id = 1, name } = tag
          return <CheckableTag
            key={id}
            checked={name === value}
            onChange={checked => this.handleChange(tag, checked)}
            closable
          >
            {name}
          </CheckableTag>
        }) : null
        }
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加分类</Button>}
      </div>
    )
  }
}

export default TagGroup
