 /**  @flow */

import React from 'react'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';
import { withRouter } from 'react-router-dom'

import colors from '../../common/theme'


const styles = {
  listitem: {
  },
  chatText: {
    fontSize: '0.8em',
    color: colors.gray,
  },
  username: {
    fontWeight: 400,
    cursor: 'pointer',
  },
  content: {
    // color: colors.gray,
    color: colors.black,
  },
  timestamp: {
    // color: colors.gray,
  },
}


class Chat extends React.Component {
  state = {}
  navigateToUser = (e) => {
    this.props.history.push(`/profile/${e.target.id}`)
  }
  render() {
    return (
      <div>
        <List>
          <ListItem
                style={styles.listitem}
                primaryText={<span style={styles.chatText}>
                  <span id={'1'} style={styles.username} onTouchTap={this.navigateToUser}>Brendan Lim</span>
                  {' '}
                  <span style={styles.content}>ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd</span>
                </span>}
                leftAvatar={<Avatar src="img/avatar/face-12.jpg" />}
                autoGenerateNestedIndicator={false}
                disableKeyboardFocus={true}
                disabled={true}
              />
          <ListItem
                style={styles.listitem}
                primaryText={<span style={styles.chat}>
                  <span id={'343'} style={styles.username} onTouchTap={this.navigateToUser}>Tester</span>
                  {' '}
                  <span style={styles.content}>OK, I'll do just that.</span>
                </span>}
                leftAvatar={<Avatar src="img/avatar/face-11.jpg" />}
                autoGenerateNestedIndicator={false}
                disableKeyboardFocus={true}
                disabled={true}
              />
        </List>
      </div>
    )
  }
}

export default withRouter(Chat)
