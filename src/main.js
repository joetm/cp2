import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

// import './default.scss'
import "../node_modules/@material/typography/dist/mdc.typography.css"

import "js/deepstream/deepstream.min.js"

  /*
  try {
    var client = deepstream('localhost:6020').login();
    var record = client.record.getRecord('some-name');
    //    var input = document.querySelector('input')
    // input.onkeyup = (function() {
    //   record.set('firstname', input.value)
    // })
    // record.subscribe('firstname', function(value) {
    //   input.value = value
    // })
  } catch(err) {
    console.error(err);
  }
  */

import App from './Components/App.jsx';

render(
	(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	),
	document.getElementById('app')
);
