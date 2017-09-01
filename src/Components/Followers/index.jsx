/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
// import Subheader from 'material-ui/Subheader'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import { fetchFollowers } from '../../actions'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'
import Follower from './Follower'


/**
 * Followers class
 * @class
 */
class Followers extends React.PureComponent {
    componentDidMount() {
      const { userid } = this.props
      this.props.fetchFollowers()
    }
    /**
     * Render the component.
     */
    render () {
        const { followers, user } = this.props
        return (
          <div>

              <h2>Followers</h2>

              <Divider />

              <List>
                {
                    followers.map(follower => (
                        <Follower
                            { ...follower.user }
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
    followers: state.followers,
    userid: ownProps.match.params.userid,
    user: state.users[ownProps.match.params.userid],
})

export default withRouter(connect(
    mapStateToProps,
    { fetchFollowers }
)(Followers))
