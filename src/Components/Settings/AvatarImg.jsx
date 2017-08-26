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
import Avatar from '../Shared/Avatar'


const blockMaxWidth = '80%' // 250

const styles = {
  dropzone: {
    height: '150px',
    width: '100%',
    border: '2px solid #888',
    borderRadius: '5px',
  },
}


const AvatarSetting = (props) => (
    <div id="avatar-settings"
        style={{
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: blockMaxWidth,
        }}
    >
        <Avatar
            src={props.avatar}
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
    avatar: state.currentUser.avatar,
})

export default connect(
    mapStateToProps
)(AvatarSetting)
