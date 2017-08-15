/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'


const styles = {
  dropzone: {
    height: '150px',
    width: '100%',
    border: '2px solid #888',
    borderRadius: '5px',
  },
}


class Upload extends React.Component {
    constructor() {
        super()
        this.state = {
            files: []
        }
        // bindings
        this.onDrop = this.onDrop.bind(this)
    }
    onDrop(acceptedFiles, rejectedFiles) {
        // do stuff with files...
    }
    render() {
        return (
            <div>
                <h2>Upload</h2>
                <div>
                    <Dropzone
                      style={styles.dropzone}
                      onDrop={this.onDrop}
                    />
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     posts: state.posts,
// })

//export default connect(
    // mapStateToProps,
//    { fetchPosts }
//)(Upload)

export default Upload
