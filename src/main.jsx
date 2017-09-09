import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// --
import './default.scss'
// --
// deepstream
// import reactMixin from 'react-mixin'
// import dsClient from 'deepstream.io-client-js'
// import DeepstreamMixin from 'deepstream.io-tools-react'

// promise polyfill
require('es6-promise').polyfill()

import App from './Components/App'


render(
    (
        <BrowserRouter>
            <App />
        </BrowserRouter>
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
