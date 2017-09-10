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


/**
 * Followers class
 * @class
 */
class Followers extends React.Component {
    componentDidMount() {
      const { userid } = this.props
      this.props.fetchFollowers(userid)
    }
    /**
     * Render the component.
     */
    render () {
        const { followers } = this.props
        // console.log('followers', followers)
        return (
          <div>

              <h2>Followers</h2>

              <Divider />

              <List>
                {
                    followers.map(follower => (
                        <Notification
                            title={follower.user.username}
                            type="follower"
                            content={follower.user.usertitle}
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
