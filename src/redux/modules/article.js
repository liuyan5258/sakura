import fetch from 'isomorphic-fetch'
import { CONFIG } from '../../constants/config.js'
import { errorHandler, serialize } from '../../constants/utils'

const ARTICLE = 'antd-blog/classify/ARTICLE'

const URLS = {
  post: `${CONFIG.server}/antd-blog/post`,
  article: `${CONFIG.server}/antd-blog/getArticle`
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ARTICLE:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}

export function fetchArticle(data) {
  return (dispatch, getState) => {
    const param = serialize({
      ...data,
      title: encodeURIComponent(data.title)
    })
    const promise = fetch(URLS['article'] + '?' + param, {
      method: 'GET'
    }).then(res => res.json())
    return errorHandler(promise).then((result) => {
      dispatch({
        type: ARTICLE,
        data: result.data
      })
      return result.data
    })
  }
}

export function postArticle(formData) {
  return (dispatch, getState) => {
    const url = URLS['post']
    const promise = fetch(url, {
      method: 'POST',
      // 设置这个header，才能正确parse
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        token: sessionStorage.getItem('__token__')
      }),
      mode: 'cors'
    }).then(res => res.json())
    return errorHandler(promise)
  }
}
