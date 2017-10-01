/** @flow */

import React from 'react'
import '../External/dropzone/dist/dropzone.css'
import 'react-dropzone-component/styles/filepicker.css'
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'

import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers, dropzoneStyle } from '../Shared/dropzoneConfig'
import Spacer from '../Shared/Spacer'
import Headline from '../Shared/Headline'


class Upload extends React.Component {
  state = {
    files: [],
    dropzoneHeight: 450,
  }
  // do not set state in componentDidMount
  componentWillMount() {
    console.log('set dropzone height', window.innerHeight - 145)
    this.setState({dropzoneHeight: window.innerHeight - 145})
  }
  onDrop = () => { // acceptedFiles, rejectedFiles
    // do stuff with files...
  }
  render() {
    return (
      <div>
        <Headline>Upload</Headline>
        <div>
          <DropzoneComponent
            style={dropzoneStyle}
            config={dropzoneConfig}
            eventHandlers={dropzoneEventHandlers}
            djsConfig={dropzoneJsConfig}
          />
        </div>
        <Spacer />
      </div>
    )
  }
}

export default Upload
