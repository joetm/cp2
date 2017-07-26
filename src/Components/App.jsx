/** @flow */

import React from 'react'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import fetch from 'unfetch'
import {Route, Switch} from 'react-router-dom'

import NavBar from './NavBar'
import Home from './Home'
import Notifications from './Notifications'
import Updates from './Updates'
import Profile from './Profile'
import Settings from './Settings'
import Error404 from './Error404'

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
}
const theme = getMuiTheme(customTheme)


const RoutedApp = () => (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/notifications" component={Notifications}/>
            <Route path="/updates" component={Updates}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/settings" component={Settings}/>
            <Route component={Error404}/>
          </Switch>
        </div>
      </MuiThemeProvider>
)

export default RoutedApp
