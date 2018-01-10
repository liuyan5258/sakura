import React, { PureComponent } from 'react'
import { Menu } from 'antd'

import { isOwnEmpty } from '../constants/utils'

const SubMenu = Menu.SubMenu

// 数据格式
// const data = [
//   {
//     "name": "工具",
//     "articleList": [
//       {
//         "title": "本站使用说明书"
//       }
//     ],
//     "childList": [null],
//     "id": 1
//   },
//   {
//     "name": "日语蓝宝书能力考",
//     "articleList": [],
//     "childList": [
//       {
//         "id": 1,
//         "name": "N5文法详解",
//         "articleList": [
//           {
//             "title": "名词、指示词、数量词"
//           }
//         ]
//       }
//     ],
//     "id": 2
//   }
// ]

class Sider extends PureComponent {
  handleClick = (e) => {
    const title = e.domEvent.target.textContent
    this.props.handleMenu(title)
    this.props.history.push(`/?title=${title}`)
  }
  render() {
    const { data } = this.props
    const defaultMenu = '本站使用说明书'
    if (isOwnEmpty(data)) return null
    return (
      <Menu
        onClick={this.handleClick}
        mode="inline"
        defaultSelectedKeys={[`${defaultMenu}`]}
        defaultOpenKeys={['1']}
      >
        {
          data.map(({ childList, articleList, id, name }) => {
            const childNode = childList && childList[0] ? childList.map(({ articleList, id, name }) => {
              const childNode = articleList ? articleList.map(({ title }, index) => {
                return <Menu.Item key={index}>{title}</Menu.Item>
              }) : null
              if (childNode) {
                return <SubMenu key={`_${id}`} title={name}>{childNode}</SubMenu>
              }
              return <Menu.Item key={id}>{name}</Menu.Item>
            }) : null
            const articleNode = articleList.length ? articleList.map(({ title }) => {
              return <Menu.Item key={title}>{title}</Menu.Item>
            }) : null
            return <SubMenu key={id} title={name}>{childNode}{articleNode}</SubMenu>
          })
        }
      </Menu>
    )
  }
}

export default Sider
