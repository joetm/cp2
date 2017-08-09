/** @flow */

import React from 'react'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
// --
// object-fit-images css polyfill for IE
import objectFitImages from 'object-fit-images'
objectFitImages()
// --
// deepstream mixins
// import DeepstreamMixin from 'deepstream.io-tools-react'
// import reactMixin from 'react-mixin'
// --
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import fetch from 'unfetch'
import { Route, Switch, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'


// --
import reducers from '../reducers'
import store from '../store'
import { theme, colors } from '../common/theme'
// --
import Scrollbutton from './Shared/Scrollbutton'
// --
import NavBar from './NavBar'
import Home from './Home'
import Forum from './Forum'
import Notifications from './Stream/Notifications'
import MessageHistory from './MessageHistory'
import Updates from './Stream'
import Profile from './Profile'
import Review from './Review'
import Settings from './Settings'
import Error from './Error'
import Guidelines from './Legal/Guidelines'
import LoginPage from './Login'
import SignupPage from './Signup'
import Privacy from './Legal/Privacy'
import DMCA from './Legal/DMCA'
import Contact from './Contact'


// <ConnectedRouter history={browserHistory}>
// </ConnectedRouter>


class RoutedApp extends React.Component {
    state = {
        isScrolled: false,
    }
    getScrollPosition() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
    }
    componentDidMount() {
        // show scroll button (overlay)
        window.onscroll = (e) => {
            if (this.getScrollPosition() > 0) {
              this.setState({isScrolled: true})
            } else {
              this.setState({isScrolled: false})
            }
        }
    }
    componentWillUnmount() {
        window.onscroll = null
    }
    /**
     * Render the component.
     */
    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
            <Provider store={store}>

              <div style={{backgroundColor: colors.bg}}>

                    <NavBar scrollPosition={this.state.scrollPosition} />

                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route path="/forum" component={Forum} />

                        <Route path="/notifications/:userid" component={Notifications} />
                        <Route path="/stream/:userid" component={Updates} />

                        <Route path="/review" component={Review} />

                        <Route path="/messages/:opponentid" component={MessageHistory} />

                        <Route path='/profile/:userid' render={props => (
                            <Profile isScrolled={this.state.isScrolled} />
                        )} />

                        <Route path="/settings" component={Settings} />

                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignupPage} />

                        <Route path="/community-guidelines" component={Guidelines} />
                        <Route path="/privacy-policy" component={Privacy} />
                        <Route path="/dmca-policy" component={DMCA} />

                        <Route path="/contact" component={Contact} />

                        <Route component={Error} code="404" />

                    </Switch>

                    <Scrollbutton
                        visible={this.state.isScrolled}
                        secondary={true}
                    />

              </div>

            </Provider>
            </MuiThemeProvider>
        )
    }
}

// reactMixin(RoutedApp, DeepstreamMixin)

export default RoutedApp
