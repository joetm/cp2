/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
// import Subheader from 'material-ui/Subheader'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import { fetchFollowers } from '../../actions'
import Notification from '../Content/Notification'
import Spacer from '../Shared/Spacer'
import Headline from '../Shared/Headline'


/**
 * Followers class
 * @class
 */
class Followers extends React.Component {
  componentDidMount() {
    this.props.fetchFollowers(this.props.userid)
  }
  /**
   * Render the component.
   */
  render () {
    const { followers } = this.props
    // console.log('followers', followers)
    return (
      <div>
        <Headline level="2">Followers</Headline>

        <Divider />

        <List>
          {
            followers.map(follower => (
              <Notification
                type="follower"
                title={follower.user.username}
                content={follower.user.usertitle}
                userid={follower.user.id}
                user={follower.user}
              />
            ))
          }
        </List>

        <Spacer />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  followers: state.followers.items,
  isFetching: state.followers.isFetching,
  userid: ownProps.match.params.userid,
  // user: state.users[ownProps.match.params.userid],
})

export default withRouter(connect(
  mapStateToProps,
  { fetchFollowers }
)(Followers))
