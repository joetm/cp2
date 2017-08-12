/** @flow */

import React from 'react'
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
// import fetch from 'unfetch'
// import { browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
// import { ConnectedRouter } from 'react-router-redux'

injectTapEventPlugin()
objectFitImages()


// --
import store from '../store'
import { theme } from '../common/theme'
// --
import RoutedApp from './RoutedApp'


// <ConnectedRouter history={browserHistory}>
// </ConnectedRouter>


class App extends React.Component {
    state = {
        isScrolled: false,
    }
    getScrollPosition() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
    }
    componentDidMount() {
        // show scroll button (overlay)
        window.onscroll = () => {
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
                <RoutedApp
                    scrollPosition={this.state.scrollPosition}
                    isScrolled={this.state.isScrolled}
                />
            </Provider>
            </MuiThemeProvider>
        )
    }
}

// reactMixin(RoutedApp, DeepstreamMixin)

export default App
