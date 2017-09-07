import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// --
import './default.scss'
// --
// deepstream
// import deepstream from 'deepstream.io-client-js'
// import DeepstreamMixin from 'deepstream.io-tools-react'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
// --
// object-fit-images css polyfill for IE
import objectFitImages from 'object-fit-images'
injectTapEventPlugin()
objectFitImages()

// promise polyfill
require('es6-promise').polyfill()


import store from './store'
import App from './Components/App'


// https://deepstream.io/tutorials/integrations/frontend-react/
// dsRecord="some-input"
// const client = deepstream('localhost:6020').login({}, () => {
render(
    (
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
    ),
    document.getElementById("app")
)

// })
// DeepstreamMixin.setDeepstreamClient(client)
