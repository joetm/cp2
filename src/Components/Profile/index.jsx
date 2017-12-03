/**  @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { fetchUser, fetchUserProfileImages } from '../../actions'
import * as routes from '../../routes'
import ProfileImg from './ProfileImg'
import Avatar from '../Shared/Avatar'
import Spacer from '../Shared/Spacer'
import ProfileStats from './ProfileStats'
import ProfileUsername from './ProfileUsername'
import OnlineStatus from './OnlineStatus'
import Posts from '../Forum/Posts'
import Album from '../Content/Album'
import Videos from '../Content/Videos'
import Followers from '../Followers'
import Stream from '../Content/Stream'
import Likes from '../Content/Likes'


const styles = {
  avatarBox: {
    position: 'relative',
    marginTop: '-150px',
    marginLeft: '40px',
    zIndex: 999,
    display: 'inline-block',
  },
}


/**
 * Profile class
 * @class
 */
class Profile extends React.Component {
  state = {
    blurredImg: false,
    user: {},
  }
  componentDidMount() {
    const { userid } = this.props
    this.props.fetchUser(userid)
    this.props.fetchUserProfileImages(userid)
  }
  toggleProfileDetails = () => {
    this.setState({blurredImg: !this.state.blurredImg})
  }
  /**
   * Render the component.
   */
  render() {
    const { user = {}, url, isScrolled, profileImages, palette } = this.props
    return (
      <div>

        <ProfileImg
            {...user}
            blurredImg={this.state.blurredImg}
            pageIsScrolled={isScrolled}
            toggleProfileDetails={this.toggleProfileDetails}
            profileImages={profileImages}
            fetchUserProfileImages={this.props.fetchUserProfileImages}
            palette={palette}
        />

          <ProfileStats
              user={user}
              palette={palette}
          />

          <div style={styles.avatarBox}>
              <Avatar
                  visible={!this.state.blurredImg}
                  src={user.avatar}
                  username={user.username}
                  onTouchTap={this.toggleProfileDetails}
              />
              <ProfileUsername
                  name={user.username}
                  usertitle={user.usertitle}
                  palette={palette}
              />
              <OnlineStatus
                  isOnline={user.isOnline}
                  applyOffset={true}
                  palette={palette}
              />
          </div>

          <Spacer />

          <Switch>
              <Route exact
                  path={`${url}${routes.UPDATES}`}
                  render={() => <Stream isEmbedded={true} />}
              />
              <Route exact
                  path={`${url}${routes.POSTS}`}
                  render={() => <Posts isEmbedded={true} />}
              />
              <Route exact
                  path={`${url}${routes.ALBUM}`}
                  render={() => <Album isEmbedded={true} />}
              />
              <Route exact
                  path={`${url}${routes.VIDEOS}`}
                  render={() => <Videos isEmbedded={true} />}
              />
              <Route exact
                  path={`${url}${routes.FOLLOWERS}`}
                  render={() => <Followers isEmbedded={true} />}
              />
              <Route exact
                  path={`${url}${routes.LIKES}`}
                  render={() => <Likes isEmbedded={true} />}
              />
              <Route component={Album} />
          </Switch>

          <Spacer />

        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  // add selected fields from the state as props to the component
  user: state.users[ownProps.match.params.userid],
  profileImages: state.profileImages.items,
  // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
  url: ownProps.match.url,
  userid: +ownProps.match.params.userid,
  palette: ownProps.muiTheme.palette,
})

export default muiThemeable()(connect(
  mapStateToProps,
  { fetchUser, fetchUserProfileImages }
)(Profile))
