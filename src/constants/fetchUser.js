/**
 * 用户登录、注册以及校验是否登录
 */
import fetch from 'isomorphic-fetch'
import { CONFIG } from './config.js'
import { errorHandler } from './utils'

const URLS = {
  valid: `${CONFIG.server}/antd-blog/valid`,
  login: `${CONFIG.server}/antd-blog/login`,
  signup: `${CONFIG.server}/antd-blog/signup`
}

const fetchUser = (type, param = {}) => {
  const url = URLS[type]
  const loginToken = sessionStorage.getItem('__token__')
  const body = type === 'valid' ? { token: loginToken || '' } : param
  const promise = fetch(url, {
    method: 'POST',
    // 设置这个header，才能正确parse
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    mode: 'cors'
  }).then(res => res.json())
  const notShowMessage = !!(type === 'valid' && loginToken)
  return errorHandler(promise, notShowMessage)
}

export default fetchUser
