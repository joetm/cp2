/** @flow */

import React from 'react'
import '../External/dropzone/dist/dropzone.css'
import 'react-dropzone-component/styles/filepicker.css'
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'

// import { palette } from '../../common/colors'
import Spacer from '../Shared/Spacer'
import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers, dropzoneStyle } from '../Shared/dropzoneConfig'


const styles = {

}


class Upload extends React.Component {
    constructor() {
        super()
        this.state = {
            files: [],
            dropzoneHeight: 450,
        }
        // bindings
        this.onDrop = this.onDrop.bind(this)
    }
    // do not set state in componentDidMount
    componentWillMount() {
        console.log('set height', window.innerHeight - 145)
        this.setState({dropzoneHeight: window.innerHeight - 145})
    }
    onDrop(acceptedFiles, rejectedFiles) {
        // do stuff with files...
    }
    render() {
        return (
            <div>
                <h2>Upload</h2>

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
