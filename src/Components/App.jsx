/** @flow */

import React from 'react'
// --
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import store from '../store'
import routes from '../routes'
import { bg as bgColor } from '../common/colors'
import Scrollbutton from './Shared/Scrollbutton'
import Theme from './Config/Theme'
import RecordDeviceDetails from './Config/DeviceDetails'
// -- Components
import NavBar from './NavBar'
import Home from './Home'
import Forum from './Forum'
import Messages from './Content/Messages'
import MessageHistory from './MessageHistory'
import Followers from './Followers'
import Users from './Users'
import Stream from './Content'
// import Feed from './Content/Stream'
import Updates from './Content/Updates'
import Pictures from './Content/Pictures'
import Videos from './Content/Videos'
import Video from './Video'
import Image from './Image'
import Likes from './Content/Likes'
import Favorites from './Content/Favorites'
import Profile from './Profile'
import Chat from './Chat'
import Review from './Review'
import Editor from './Editor'
import Settings from './Settings'
import ErrorPage from './Error'
import LoginPage from './Login'
import SignupPage from './Signup'
import Legal from './Legal'
import Contact from './Contact'
import Upload from './Upload'
import Sidebar from './Sidebar'
import LoginSidebar from './Sidebar/Login'
import ReviewLeaderboard from './Review/Leaderboard'
import ModArea from './ModArea'
import Playlist from './Playlist'

// <ConnectedRouter history={browserHistory}>
// </ConnectedRouter>


// @connect(state => state)
class App extends React.Component {
    /**
     * Render the component.
     */
    render() {
      return (
          <Provider store={store}>
          <Theme>

            <div>

              <RecordDeviceDetails />

              <NavBar />

              <Switch>

                <Route exact path={routes.HOME} component={Home} />

                <Route path={routes.FORUM} component={Forum} />

                <Route exact path={routes.CHAT} component={Chat} />

                <Route exact path={routes.STREAM} component={Stream} />

                <Route exact path={routes.UPDATES} component={Updates} />

                <Route exact path={routes.IMAGES} component={Pictures} />
                <Route exact path={`${routes.IMAGES}/:imageid`} component={Image} />

                <Route exact path={routes.VIDEOS} component={Videos} />
                <Route exact path={`${routes.VIDEOS}/:videoid`} component={Video} />

                <Route exact path={routes.MESSAGES} component={Messages} />
                <Route path={`${routes.MESSAGES}/:opponentid`} component={MessageHistory} />

                <Route exact path={routes.LIKES} component={Likes} />
                <Route exact path={routes.FAVORITES} component={Favorites} />

                <Route exact path={routes.REVIEW} component={Review} />
                <Route exact path={`${routes.REVIEW}${routes.LEADERBOARD}`} component={ReviewLeaderboard} />
                <Route path={`${routes.REVIEW}/:itemid`} component={Review} />

                <Route path={routes.PLAYLIST} component={Playlist} />

                <Route path={routes.MEMBERS} component={Users} />

                <Route path={`${routes.PROFILE}/:userid`} component={Profile} />
                <Route path={`${routes.FOLLOWERS}/:userid`} component={Followers} />

                <Route path={routes.SETTINGS.INDEX} component={Settings} />

                <Route exact path={routes.LOGIN} component={LoginPage} />
                <Route exact path={routes.SIGNUP} component={SignupPage} />

                {/* DEV */}
                <Route path={`${routes.EDIT}`} component={Editor} />

                <Route path={routes.LEGAL.INDEX} component={Legal} />

                <Route exact path={routes.CONTACT} component={Contact} />

                <Route path={routes.MODAREA} component={ModArea} />

                <Route exact path={routes.UPLOAD} component={Upload} />

                <Route component={ErrorPage} code="404" />

              </Switch>

              <Scrollbutton secondary={true} />

              <Sidebar />
              <LoginSidebar />
              {/* <StreamSidebar /> */}

            </div>

          </Theme>
          </Provider>
        )
    }
}

export default App
