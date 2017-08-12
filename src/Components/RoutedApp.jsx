/** @flow */

import React from 'react'
import MobileDetect from 'mobile-detect'
import { Route, Switch, browserHistory } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { setDeviceDetails } from '../reducers'
import { theme, colors } from '../common/theme'
// --
import Scrollbutton from './Shared/Scrollbutton'
// --
import NavBar from './NavBar'
import Home from './Home'
import Forum from './Forum'
import Thread from './Forum/Thread'
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
    componentDidMount() {
        if (!this.props.deviceDetails) {
            const device = new MobileDetect(window.navigator.userAgent)
            const obj = {
                "isMobile": device.phone(),
                "isTablet": device.tablet(),
                "useragent": window.navigator.userAgent,
                "OS": device.os(),
                "isIPhone": device.is('iPhone'),
                "isBot": device.is('bot'),
                "isPlaystation": device.match('playstation'),
                "isXbox": device.match('xbox'),
            }
            this.props.setDeviceDetails(obj)
        }
    }
    /**
     * Render the component.
     */
    render() {
        return (
              <div style={{backgroundColor: colors.bg}}>

                    <NavBar scrollPosition={this.props.scrollPosition} />

                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route path="/forum" component={Forum} />

                        <Route path="/notifications/:userid" component={Notifications} />
                        <Route path="/stream/:userid" component={Updates} />

                        <Route path="/review" component={Review} />

                        <Route path="/messages/:opponentid" component={MessageHistory} />

                        <Route path='/profile/:userid' render={props => (
                            <Profile isScrolled={this.props.isScrolled} />
                        )} />

                        <Route path="/settings" component={Settings} />

                        <Route path="/thread/:threadid" component={Thread} />

                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignupPage} />

                        <Route path="/community-guidelines" component={Guidelines} />
                        <Route path="/privacy-policy" component={Privacy} />
                        <Route path="/dmca-policy" component={DMCA} />

                        <Route path="/contact" component={Contact} />

                        <Route component={Error} code="404" />

                    </Switch>

                    <Scrollbutton
                        visible={this.props.isScrolled}
                        secondary={true}
                    />

              </div>
        )
    }
}

// reactMixin(RoutedApp, DeepstreamMixin)

const mapStateToProps = (state) => ({
    isMobileDevice: state.app.deviceDetails,
})

export default connect(
    mapStateToProps,
    { setDeviceDetails }
)(RoutedApp)
