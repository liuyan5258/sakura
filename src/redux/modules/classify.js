import fetch from 'isomorphic-fetch'
import { CONFIG } from '../../constants/config.js'
import { errorHandler } from '../../constants/utils'

const CLASSIFY_LIST = 'antd-blog/classify/CLASSIFY_LIST'

const initialState = {
  data: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLASSIFY_LIST:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}

const URLS = {
  classify: `${CONFIG.server}/antd-blog/getClassifyList`
}

export function fetchClassify() {
  return (dispatch, getState) => {
    const promise = fetch(URLS['classify'], {
      method: 'GET'
    }).then(res => res.json())
    return errorHandler(promise).then((result) => {
      dispatch({
        type: CLASSIFY_LIST,
        data: result.data
      })
      return result.data
    })
  }
}
