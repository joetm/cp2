import React from 'react';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fetch from 'unfetch';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import NavBar from './NavBar.jsx';
import Profile from './Profile.jsx';
import Settings from './Settings.jsx';

import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
const customTheme = {
  palette: {
    primary1Color: pinkA200,
    primary2Color: cyan700,
    primary3Color: grey400
  }
};
const theme = getMuiTheme(customTheme);


const RoutedApp = () => (
  <Router>
      <MuiThemeProvider muiTheme={theme}>
        <div>

          <NavBar />

          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/settings" component={Settings}/>

        </div>
      </MuiThemeProvider>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

export default RoutedApp
