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
import ScrollIndicator from './Shared/ScrollIndicator'
//--
import theme from '../shared/theme'


//                <ScrollIndicator scrollPosition={this.state.scrollPosition} primary={true} />

class RoutedApp extends React.Component {
    state = {
        scrollPosition: 0,
    }
    componentDidMount() {
        // show scroll button (overlay)
        window.onscroll = function (e) {
            // only update the scroll pos in Xpx intervals
            let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            if (scrollTop % 5 === 0) {
              this.setState({scrollPosition: scrollTop})
            }
        }.bind(this)
    }
    componentWillUnmount() {
        window.onscroll = null
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

                  <Route path='/profile/:userid' render={props => (
                      <Profile scrollPosition={this.state.scrollPosition} />
                  )} />

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
