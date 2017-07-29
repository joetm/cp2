import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

// import './default.scss'
import "../node_modules/@material/typography/dist/mdc.typography.css"

import App from './Components/App.jsx';

render(
	(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	),
	document.getElementById('app')
);
