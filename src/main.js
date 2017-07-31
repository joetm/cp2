import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
//--
// import './default.scss'
import "../node_modules/@material/typography/dist/mdc.typography.css"
//--
// deepstream
//import deepstream from 'deepstream.io-client-js'
//import DeepstreamMixin from 'deepstream.io-tools-react'

import App from './Components/App.jsx';


// https://deepstream.io/tutorials/integrations/frontend-react/
// dsRecord="some-input"
//const client = deepstream('localhost:6020').login({}, () => {
	render(
		(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		),
		document.getElementById("app")
	)
//})
//DeepstreamMixin.setDeepstreamClient(client)
