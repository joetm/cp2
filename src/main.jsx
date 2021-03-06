import React from 'react'

// reactopt
if (process.env.NODE_ENV !== 'production') {
    const { reactopt } = require('reactopt');
    reactopt(React);
}

import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './default.scss'
import store from './store'
// --
// deepstream
// import reactMixin from 'react-mixin'
// import dsClient from 'deepstream.io-client-js'
// import DeepstreamMixin from 'deepstream.io-tools-react'

// --------------------------------------------
// POLYFILLS

// promise polyfill
require('es6-promise').polyfill()

// object-fit-images css polyfill for IE
require('object-fit-images')()

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
require('react-tap-event-plugin')()

// --------------------------------------------

import App from './Components/App'


render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById("app")
)

// https://deepstream.io/tutorials/integrations/frontend-react/
// const ds = dsClient('localhost:6020').login({}, () => {
//     render(
//         (
//             <BrowserRouter>
//                 <App dsRecord="chat" />
//             </BrowserRouter>
//         ),
//         document.getElementById("app")
//     )
// })
// reactMixin(App, DeepstreamMixin)
// DeepstreamMixin.setDeepstreamClient(ds)
