import 'react-hot-loader'
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './styles.scss'

ReactDom.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
