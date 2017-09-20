/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import '../External/dropzone/dist/dropzone.css'
import 'react-dropzone-component/styles/filepicker.css'
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'
import RaisedButton from 'material-ui/RaisedButton'
// import Snackbar from 'material-ui/Snackbar'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { fetchUserVerificationImages, removeImages } from '../../actions'
import './transitions.scss'
import Spacer from '../Shared/Spacer'
import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers, dropzoneStyle } from '../Shared/dropzoneConfig'
import { blockMaxWidth } from './styles'
import UpdateWrap from '../Shared/UpdateWrap'
import Img from './Img'


class VerificationImg extends React.Component {
  state = {
    imagesFetched: false,
    selection: [],
  }
  setSelection = (selection) => {
    this.setState({selection})
  }
  fetchVerificationImagesOnce = () => {
    const { userid } = this.props
    if (userid && !this.state.imagesFetched) {
      this.props.fetchUserVerificationImages(userid)
      this.setState({imagesFetched: true})
    }
  }
  deleteVerificationImages = () => {
    // console.log('removing selection', this.state.selection)
    this.props.removeImages(this.state.selection)
    this.setState({
      selection: [],
    })
  }
  componentWillMount() {
    this.fetchVerificationImagesOnce()
  }
  render() {
    const { verificationImages } = this.props

    return (
      <div
          id="profileImg-settings"
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

          <UpdateWrap className="container">
            <ReactCSSTransitionGroup
              transitionName="verpic"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
            {
               verificationImages &&
               verificationImages.map(item => (
                <Img
                    item={item}
                    selection={this.state.selection}
                />
              ))
            }
            </ReactCSSTransitionGroup>
          </UpdateWrap>

          <Spacer />

          <RaisedButton
            label="Delete Verification Image(s)"
            disabled={this.props.isFetching}
            onTouchTap={this.deleteVerificationImages}
            style={{display: this.state.selection.length ? 'block' : 'none'}}
          />

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
