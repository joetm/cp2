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

import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers, dropzoneStyle } from '../Shared/dropzoneConfig'
import { removeProfileImg, fetchUserProfileImages } from '../../actions'
import { blockMaxWidth } from './styles'
import ImgContainer from './ImgContainer'
import Spacer from '../Shared/Spacer'


class ProfileImg extends React.Component {
  state = {
    selection: [],
  }
  setSelection = (selection) => {
    this.setState({ selection })
  }
  deleteProfileImages = () => {
    // TODO
  }
  render() {
    const { userid, isFetching, profileImages } = this.props
    const { selection } = this.state
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

        {
          userid &&
            <ImgContainer
              images={profileImages}
              action={this.props.fetchUserProfileImages}
              userid={userid}
              selection={selection}
              setSelection={this.setSelection}
            />
        }

        <Spacer />

        <RaisedButton
          label={`Delete Profile Image${selection.length > 1 ? 's' : ''}`}
          disabled={isFetching}
          onTouchTap={this.deleteProfileImages}
          disabled={!selection.length}
        />

        <Spacer />

{/*
        <Snackbar
          open={this.state.msgOpen}
          message="Profile image removed"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
*/}

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userid: state.currentUser.id,
  profileImages: state.profileImages.items,
  isFetching: state.profileImages.isFetching,
})

export default connect(
  mapStateToProps,
  { removeProfileImg, fetchUserProfileImages }
)(ProfileImg)
