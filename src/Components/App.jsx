/** @flow */

import React from 'react'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
//--
// deepstream mixins
//import DeepstreamMixin from 'deepstream.io-tools-react'
//import reactMixin from 'react-mixin'
//--
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import fetch from 'unfetch'
import {Route, Switch} from 'react-router-dom'

import NavBar from './NavBar/'
import Home from './Home/'
//import Forum from './Forum/'
import Notifications from './Stream/Notifications'
import Updates from './Stream/'
import Profile from './Profile/'
import Settings from './Settings/'
import Error from './Error/'
//--
import theme from '../shared/theme'


class RoutedApp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    componentDidMount() {

    }
    // <Route exact path="/forum" component={Forum}/>
    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
              <div>
                <NavBar />
                <Switch>
                  <Route exact path="/" component={Home}/>

                  <Route path="/notifications/:userid" component={Notifications}/>
                  <Route path="/stream/:userid" component={Updates}/>
                  <Route path="/profile/:userid" component={Profile}/>
                  <Route path="/settings" component={Settings}/>
                  <Route component={Error} code="404" />
                </Switch>
              </div>
            </MuiThemeProvider>
        )
    }
}

//reactMixin(RoutedApp, DeepstreamMixin)

export default RoutedApp
