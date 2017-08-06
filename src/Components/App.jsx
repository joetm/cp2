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
import {Route, Switch, browserHistory} from 'react-router-dom'
import {Provider} from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, push} from 'react-router-redux'


//--
import reducers from './root-reducers'
import store from './root-store'
//--
import NavBar from './NavBar/'
import Home from './Home/'
//import Forum from './Forum/'
import Notifications from './Stream/Notifications'
import Updates from './Stream/'
import Profile from './Profile/'
import Review from './Review/'
import Settings from './Settings/'
import Error from './Error/'
import Scrollbutton from './Shared/Scrollbutton'
//--
import {theme, colors} from '../shared/theme'


//                <Provider store={store}>
//<ConnectedRouter history={browserHistory}>
//</ConnectedRouter>
//                </Provider>


class RoutedApp extends React.Component {
    state = {
        scrollPosition: this.getScrollPosition(),
    }
    getScrollPosition() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
    }
    componentDidMount() {
        // show scroll button (overlay)
        window.onscroll = (e) => {
            // only update the scroll pos in Xpx intervals
            let scrollTop = this.getScrollPosition()
            if (scrollTop % 5 === 0) {
              this.setState({scrollPosition: scrollTop})
            }
        }
    }
    componentWillUnmount() {
        window.onscroll = null
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
              <div style={{backgroundColor: colors.bg}}>

                    <NavBar scrollPosition={this.state.scrollPosition} />

                    <Switch>
                      <Route exact path="/" component={Home}/>

                      <Route path="/notifications/:userid" component={Notifications}/>
                      <Route path="/stream/:userid" component={Updates}/>

                      <Route path="/review" component={Review}/>

                      <Route path='/profile/:userid' render={props => (
                          <Profile scrollPosition={this.state.scrollPosition} />
                      )} />

                      <Route path="/settings" component={Settings}/>
                      <Route component={Error} code="404" />
                    </Switch>

                    <Scrollbutton
                        visible={this.state.scrollPosition > 80}
                        secondary={true}
                    />

              </div>
            </MuiThemeProvider>
        )
    }
}

//reactMixin(RoutedApp, DeepstreamMixin)

export default RoutedApp
