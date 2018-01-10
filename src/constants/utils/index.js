import { message } from 'antd'
import entries from '../es7-polifill/entries'

export function errorHandler(promise, notShowMessage) {
  return promise.then(data => {
    if (data.status === 1 && data.msg && !notShowMessage) {
      message.success(data.msg)
    }
    return data
  }).catch((e) => {
    let errorMessage = JSON.stringify(e)
    if (errorMessage === '{}' || !errorMessage) {
      errorMessage = '操作失败'
    }
    message.error(errorMessage)
  })
}

export function serialize(obj) {
  return entries(obj).map(([key, val]) => `${key}=${val}`).join('&')
}

export function getQueryString(obj, name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = obj.search.substr(1).match(reg)
  return r !== null ? decodeURIComponent(r[2]) : null
}

export function isOwnEmpty(obj) {
  if (Object.prototype.toString.call(obj) === '[object Array]' && obj.length === 0) {
    return true
  }
  if (Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length === 0) {
    return true
  }
  if (obj === '' || obj === undefined) {
    return true
  }
  return false
}
