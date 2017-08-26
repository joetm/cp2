/** @flow */

import React from 'react'
// --
import MobileDetect from 'mobile-detect'
import { Route, Switch } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
// --
// object-fit-images css polyfill for IE
import objectFitImages from 'object-fit-images'
// --
// deepstream mixins
// import DeepstreamMixin from 'deepstream.io-tools-react'
// import reactMixin from 'react-mixin'
// --
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'

injectTapEventPlugin()
objectFitImages()

import store from '../store'
import routes from '../routes'
// import DevTools from '../DevTools'
import { setDeviceDetails } from '../actions'
import { theme, colors } from '../common/theme'
// --
import Scrollbutton from './Shared/Scrollbutton'
// --
import NavBar from './NavBar'
import Home from './Home'
import Forum from './Forum'
import Notifications from './Stream/Notifications'
import MessageHistory from './MessageHistory'
import Followers from './Followers'
import Users from './Users'
import Stream from './Stream'
import Video from './Video'
import Image from './Image'
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
import Upload from './Upload'
import Sidebar from './Sidebar'

// <ConnectedRouter history={browserHistory}>
// </ConnectedRouter>


class App extends React.Component {
    state = {
        isScrolled: false,
    }
    getScrollPosition() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
    }
    componentWillMount() {
        // show scroll button (overlay)
        window.onscroll = () => {
            this.setState({isScrolled: this.getScrollPosition() > 0})
        }
    }
    componentDidMount() {
        // store mobile device info
        const device = new MobileDetect(window.navigator.userAgent)
        const obj = {
            isMobile: device.phone(),
            isTablet: device.tablet(),
            useragent: window.navigator.userAgent,
            OS: device.os(),
            isIPhone: device.is('iPhone'),
            isBot: device.is('bot'),
            isPlaystation: device.match('playstation'),
            isXbox: device.match('xbox'),
        }
        store.dispatch(setDeviceDetails(obj))
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
          {/*<CookiesProvider>*/}

            <div style={{backgroundColor: colors.bg}}>

              <NavBar isScrolled={this.state.isScrolled} />

              <Switch>
                <Route exact path={routes.HOME} component={Home} />

                <Route path={routes.FORUM} component={Forum} />

                <Route exact path={routes.NOTIFICATIONS} component={Notifications} />

                <Route path={`${routes.STREAM}/:userid`} component={Stream} />

                <Route path={`${routes.VIDEOS}/:videoid`} component={Video} />
                <Route path={`${routes.IMAGES}/:imageid`} component={Image} />

                <Route exact path={routes.REVIEW} component={Review} />

                <Route path={`${routes.MESSAGES}/:opponentid`} component={MessageHistory} />

                <Route path={`${routes.PROFILE}/:userid`}
                    render={() => (
                        <Profile isScrolled={this.state.isScrolled} />
                    )} />

                <Route path={`${routes.FOLLOWERS}/:userid`} component={Followers} />

                <Route exact path={routes.MEMBERS} component={Users} />

                <Route exact path={routes.SETTINGS} component={Settings} />

                <Route exact path={routes.LOGIN} component={LoginPage} />
                <Route exact path={routes.SIGNUP} component={SignupPage} />

                <Route exact path={routes.LEGAL.COMMUNITY} component={Guidelines} />
                <Route exact path={routes.LEGAL.PRIVACY} component={Privacy} />
                <Route exact path={routes.LEGAL.DMCA} component={DMCA} />

                <Route exact path={routes.CONTACT} component={Contact} />

                <Route exact path={routes.UPLOAD} component={Upload} />

                <Route component={Error} code="404" />

              </Switch>

              <Scrollbutton
                  visible={this.state.isScrolled}
                  secondary={true}
              />

              <Sidebar />

              {/* <DevTools /> */}

            </div>

          {/* </CookiesProvider> */}
          </Provider>
          </MuiThemeProvider>
        )
    }
}

// reactMixin(RoutedApp, DeepstreamMixin)

export default App
