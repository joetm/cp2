/** @flow */

import React from 'react'
// import 'simple-react-dropzone/ui/css/filepicker.css'
// import 'simple-react-dropzone/ui/css/dropzone.css'
import '../External/dropzone/dist/dropzone.css'
import { SimpleReactDropzone } from 'simple-react-dropzone'

import { colors } from '../../common/theme'
import Spacer from '../Shared/Spacer'


const styles = {
  dropzone: {
    cursor: 'pointer',
    margin: '0 auto',
    height: '450px',
    border: '2px solid #888',
    borderRadius: '5px',
  },
  dropzoneWrapper: {
    maxWidth: '80%',
    textAlign: 'center',
    margin: '0 auto',
  },
}
// const actionStyles = {
//   activeStyle: {
//     backgroundColor: colors.palette.primary2Color,
//   },
//   acceptStyle: {
//     backgroundColor: colors.palette.primary3Color,
//   },
//   rejectStyle: {
//     backgroundColor: colors.palette.primary1Color,
//   },
// }


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

                <div style={styles.dropzoneWrapper}>
                    <SimpleReactDropzone
                        name="files"
                        maxFiles={30}
                        uploadUrl={'http://your-upload-url'}
                        imediateRemove={false}
                        maxFilesize={10} // MB
                        existingFiles={[]}
                        style={{ ...styles.dropzone, height: this.state.dropzoneHeight }}
                        accept="image/jpg, image/jpeg, image/png, image/gif"
                        onDrop={this.onDrop}
                    />
                      {/* ... actionStyles */}
                </div>

                <Spacer />

            </div>
        )
    }
}

export default Upload
