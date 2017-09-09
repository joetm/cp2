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
import { removeVerificationImg } from '../../actions'
import { blockMaxWidth, dropzoneStyle } from './styles'


class VerificationImg extends React.Component {
  state = {
    msgOpen: false,
  }
  handleRequestClose = () => {
    this.setState({ msgOpen: false })
  }
  deleteVerificationImg = () => {
    this.props.removeVerificationImg()
    this.setState({ msgOpen: true })
  }
  render() {
    const { verificationimg } = this.props
    return (
      <div
          id="profileImg-settings"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: blockMaxWidth,
          }}
      >

          <img
              src={verificationimg}
              alt=""
              style={{
                  width: '100%',
                  height: 'auto',
              }}
          />

          <DropzoneComponent
            style={dropzoneStyle}
            config={dropzoneConfig}
            eventHandlers={dropzoneEventHandlers}
            djsConfig={dropzoneJsConfig}
          />

          <Spacer />

          <RaisedButton
            label="Delete Profile Image"
            onTouchTap={this.deleteVerificationImg}
          />

          <Snackbar
            open={this.state.msgOpen}
            message="Verification image removed"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    // TODO:
    // verificationimg: state.currentUser.profileimg,
})

export default connect(
    mapStateToProps,
    { removeVerificationImg }
)(VerificationImg)
