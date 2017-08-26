/** @flow */

import React from 'react'
import { connect } from 'react-redux'
// dropzone css
import '../External/dropzone/dist/dropzone.css'
// react dropzone css
import 'react-dropzone-component/styles/filepicker.css'
// dropzone component
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'

import { dropzoneConfig, dropzoneJsConfig, dropzoneEventHandlers } from './dropzoneConfig'


const blockMaxWidth = '80%' // 250

const styles = {
  dropzone: {
    height: '150px',
    width: '100%',
    border: '2px solid #888',
    borderRadius: '5px',
  },
}


const ProfileImg = (props) => (
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
            src={props.profileimg}
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
    </div>
)


const mapStateToProps = (state) => ({
    profileimg: state.currentUser.profileimg,
})

export default connect(
    mapStateToProps
)(ProfileImg)
