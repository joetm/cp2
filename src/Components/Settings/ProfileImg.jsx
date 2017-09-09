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
import { removeProfileImg } from '../../actions'
import { blockMaxWidth, dropzoneStyle } from './styles'


class ProfileImg extends React.Component {
  state = {
    msgOpen: false,
  }
  handleRequestClose = () => {
    this.setState({ msgOpen: false })
  }
  deleteProfileImg = () => {
    this.props.removeProfileImg()
    this.setState({ msgOpen: true })
  }
  render() {
    const { profileimg } = this.props
    return (
      <div
          id="profileImg-settings"
          style={{
            width: blockMaxWidth,
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
            <img
                src={profileimg}
                alt=""
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
          </div>

          <Spacer />

          <RaisedButton
            label="Delete Profile Image"
            onTouchTap={this.deleteProfileImg}
          />

          <Snackbar
            open={this.state.msgOpen}
            message="Profile image removed"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    profileimg: state.currentUser.profileimg,
})

export default connect(
    mapStateToProps,
    { removeProfileImg }
)(ProfileImg)
