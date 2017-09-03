 /** @flow */

import React from 'react'
import { connect } from 'react-redux'
// dropzone css
import '../External/dropzone/dist/dropzone.css'
// react dropzone css
import 'react-dropzone-component/styles/filepicker.css'
// dropzone component
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import Spacer from '../Shared/Spacer'
import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers } from './dropzoneConfig'
import Avatar from '../Shared/Avatar'
import { removeAvatar } from '../../actions'


const blockMaxWidth = '80%' // 250

const styles = {
  dropzone: {
    height: '150px',
    width: '100%',
    border: '2px solid #888',
    borderRadius: '5px',
  },
}


class AvatarSetting extends React.PureComponent {
  state = {
    msgOpen: false,
  }
  handleRequestClose = () => {
    this.setState({ msgOpen: false })
  }
  deleteAvatar = () => {
    this.props.removeAvatar()
    this.setState({ msgOpen: true })
  }
  render() {
    const { avatar, username } = this.props
    return (
      <div id="avatar-settings"
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: blockMaxWidth,
          }}
      >

          <Avatar
              src={avatar}
              username={username}
          />

          <DropzoneComponent
            style={styles.dropzone}
            config={dropzoneConfig}
            eventHandlers={dropzoneEventHandlers}
            djsConfig={dropzoneJsConfig}
          />

          <Spacer />

          <RaisedButton
            label="Delete Avatar"
            onTouchTap={this.deleteAvatar}
          />

          <Snackbar
            open={this.state.msgOpen}
            message="Avatar removed"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    avatar: state.currentUser.avatar,
    username: state.currentUser.username,
})

export default connect(
    mapStateToProps,
    { removeAvatar }
)(AvatarSetting)
