/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import '../External/dropzone/dist/dropzone.css'
import 'react-dropzone-component/styles/filepicker.css'
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUserVerificationImages, removeImages } from '../../actions'
import './transitions.scss'
import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers, dropzoneStyle } from '../Shared/dropzoneConfig'
import { blockMaxWidth } from './styles'
import ImgContainer from './ImgContainer'
import Spacer from '../Shared/Spacer'


class VerificationImg extends React.Component {
  state = {
    selection: [],
  }
  setSelection = (selection) => {
    this.setState({selection})
  }
  deleteVerificationImages = () => {
    // console.log('removing selection', this.state.selection)
    this.props.removeImages(this.state.selection)
    this.setState({selection: []})
  }
  render() {
    const { userid, verificationImages, fetchUserVerificationImages } = this.props

    return (
      <div
          id="verificationImg-settings"
          style={{
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
                images={verificationImages}
                action={fetchUserVerificationImages}
                userid={userid}
                selection={this.state.selection}
                setSelection={this.setSelection}
              />
          }

          <Spacer />

          <RaisedButton
            label={`Delete Verification Image${this.state.selection.length > 1 ? 's' : ''}`}
            disabled={this.props.isFetching}
            disabled={!this.state.selection.length}
            onTouchTap={this.deleteVerificationImages}
          />
{/*TODO: duplicate prop*/}

          <Spacer />

{/*
          <Snackbar
            open={this.state.msgOpen}
            message="Verification image removed"
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
    verificationImages: state.verificationImages.items,
    isFetching: state.verificationImages.isFetching,
})

export default connect(
    mapStateToProps,
    { fetchUserVerificationImages, removeImages }
)(VerificationImg)
