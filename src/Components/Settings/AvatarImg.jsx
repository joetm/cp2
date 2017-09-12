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
// import Snackbar from 'material-ui/Snackbar'

import { removeAvatar } from '../../actions'
import Spacer from '../Shared/Spacer'
import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers, dropzoneStyle } from '../Shared/dropzoneConfig'
import Avatar from '../Shared/Avatar'
import { blockMaxWidth } from './styles'


class AvatarSetting extends React.Component {
  deleteAvatar = () => {
    this.props.removeAvatar(this.props.userid)
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

          <DropzoneComponent
            style={dropzoneStyle}
            config={dropzoneConfig}
            eventHandlers={dropzoneEventHandlers}
            djsConfig={dropzoneJsConfig}
          />

          <Spacer />

          <div>
            <Avatar
                src={avatar}
                username={username}
            />
          </div>

          <RaisedButton
            label="Delete Avatar"
            onTouchTap={this.deleteAvatar}
          />

{/*
          <Snackbar
            open={this.state.msgOpen}
            message="Avatar removed"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />
*/}

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    avatar: state.currentUser.avatar,
    username: state.currentUser.username,
    userid: state.currentUser.id,
})

export default connect(
    mapStateToProps,
    { removeAvatar }
)(AvatarSetting)
