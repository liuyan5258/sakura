
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import article from './modules/article'
import classify from './modules/classify'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk]

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`)

//   middlewares.push(logger)
// }

const reducer = combineReducers({
  article,
  classify
})

const configureStore = (initialState) => createStore(reducer, initialState, composeEnhancers(
  applyMiddleware(...middlewares)
))

export default configureStore
