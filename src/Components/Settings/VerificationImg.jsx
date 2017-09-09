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
import Checkbox from 'material-ui/Checkbox'

import { fetchUserVerificationImages, removeImages } from '../../actions'
import Spacer from '../Shared/Spacer'
import colors from '../../common/theme'
import Update from '../Content/Update'
import GridWrap from '../Shared/GridWrap'
import CellWrapper from '../Shared/CellWrapper'
import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers } from './dropzoneConfig'
import { blockMaxWidth, dropzoneStyle } from './styles'
import UpdateWrap from '../Shared/UpdateWrap'


const styles = {
  cellwrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  checkboxIcon: {
    color: colors.white,
  },
  verificationImage: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
  },
}


class VerificationImg extends React.Component {
  state = {
    msgOpen: false,
    imagesFetched: false,
    selection: [],
  }
  handleRequestClose = () => {
    this.setState({ msgOpen: false })
  }
  deleteVerificationImages = () => {
    console.log('removing selection', this.state.selection)
    this.props.removeImages(this.state.selection)
    this.setState({
      msgOpen: true,
      selection: [],
    })
  }
  fetchVerificationImagesOnce = () => {
    const { userid } = this.props
    if (userid && !this.state.imagesFetched) {
      this.props.fetchUserVerificationImages(userid)
      this.setState({imagesFetched: true})
    }
  }
  selectImage = (id) => {
    const newSelection = [...this.state.selection]
    newSelection.push(id)
    this.setState({selection: newSelection})
  }
  deselectImage = (index) => {
    const newSelection = [...this.state.selection]
    newSelection.splice(index, 1)
    this.setState({selection: newSelection})
  }
  render() {
    const { verificationImages } = this.props

    this.fetchVerificationImagesOnce()

    return (
      <div
          id="profileImg-settings"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: blockMaxWidth,
          }}
      >

          {/*
          <img
              src={verificationimg}
              alt=""
              style={{
                  width: '100%',
                  height: 'auto',
              }}
          />
          */}

          <DropzoneComponent
            style={dropzoneStyle}
            config={dropzoneConfig}
            eventHandlers={dropzoneEventHandlers}
            djsConfig={dropzoneJsConfig}
          />

          <Spacer />

          <UpdateWrap className="container">
          {
            verificationImages && verificationImages.map(item =>
              <div
                className="updateBox"
                key={`vimg_${item.id}`}
                style={styles.cellwrapper}
              >
                <Checkbox
                  style={styles.checkbox}
                  iconStyle={styles.checkboxIcon}
                  onCheck={(e, isInputChecked) => {
                    const index = this.state.selection.indexOf(item.id)
                    if (isInputChecked) {
                      if (index === -1) {
                        this.selectImage(item.id)
                      }
                    } else {
                      if (index !== -1) {
                        this.deselectImage(index)
                      }
                    }
                  }}
                  checked={this.state.selection.indexOf(item.id) !== -1}
                />
                <img
                  src={item.thumb}
                  style={styles.verificationImage}
                  alt=""
                  onTouchTap={() => {
                    const index = this.state.selection.indexOf(item.id)
                    if (index === -1) {
                      this.selectImage(item.id)
                    } else {
                      this.deselectImage(index)
                    }
                  }}
                />
              </div>
            )
          }
          </UpdateWrap>

          <Spacer />

          <RaisedButton
            label="Delete Verification Image(s)"
            disabled={this.props.isFetching}
            onTouchTap={this.deleteVerificationImages}
            style={{display: this.state.selection.length ? 'block' : 'none'}}
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
    userid: state.currentUser.id,
    verificationImages: state.verificationImages.items,
    isFetching: state.verificationImages.isFetching,
})

export default connect(
    mapStateToProps,
    { fetchUserVerificationImages, removeImages }
)(VerificationImg)
