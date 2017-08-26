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


const blockMaxWidth = '80%' // 250

const styles = {
  dropzone: {
    height: '150px',
    width: '100%',
    border: '2px solid #888',
    borderRadius: '5px',
  },
}


class ProfileImg extends React.PureComponent {
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

          <img
              src={profileimg}
              alt=""
              style={{
                  width: '100%',
                  height: 'auto',
              }}
          />

          <DropzoneComponent
            style={styles.dropzone}
            config={dropzoneConfig}
            eventHandlers={dropzoneEventHandlers}
            djsConfig={dropzoneJsConfig}
          />

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
