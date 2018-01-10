import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import registerServiceWorker from './registerServiceWorker'

import Root from './containers/root'

import './index.css'

const store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
