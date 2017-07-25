/** @flow */

import React from 'react'
import Toggle from 'material-ui/Toggle'

// dropzone css
import 'react-dropzone-component/styles/filepicker.css'
// import 'dropzone/dist/min/dropzone.css'
// dropzone component
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'

// import ToolBar from './ToolBar.jsx'
import Avatar from './Avatar.jsx'
import Spacer from './Spacer.jsx'

const blockMaxWidth = '80%'; // 250

const styles = {
  settingsBlock: {
    maxWidth: blockMaxWidth,
    margin: 'auto auto',
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
  dropzone: {
    height: '150px',
    width: '100%',
    border: '2px solid #888',
    borderRadius: '5px',
  },
}


const Toggles = () => (
  <div style={styles.settingsBlock}>
    <Toggle
      label="Simple"
      style={styles.toggle}
    />
    <Toggle
      label="Toggled by default"
      defaultToggled={true}
      style={styles.toggle}
    />
    <Toggle
      label="Styling"
      thumbStyle={styles.thumbOff}
      trackStyle={styles.trackOff}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    />
  </div>
)


const dropzoneConfig = {
    iconFiletypes: ['.jpg', '.jpeg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler',
}
const dropzoneJsConfig = {
    addRemoveLinks: true,
    params: {
        myParameter: "I'm a parameter!"
    },
}
const dropzoneEventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: [], // callbackArray
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: [], // simpleCallBack
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null,
}

class Settings extends React.PureComponent {

	render () {
		  return (
          <div style={{textAlign: 'center'}}>
            <h1>Settings</h1>
            <h2>ProfileImg</h2>
                <div
                    id="profileImg-settings"
                    style={{
                      width: '80%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      maxWidth: blockMaxWidth,
                    }}
                >
                    <img
                        src={'/img/dummyimg.jpg'}
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
                <Spacer />
            <h2>Avatar</h2>
                <div id="avatar-settings"
                    style={{
                      width: '80%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      maxWidth: blockMaxWidth,
                    }}
                >
                    <Avatar
                        src={'/img/avatar/face.jpg'}
                    />
                    <DropzoneComponent
                      style={styles.dropzone}
                      config={dropzoneConfig}
                      eventHandlers={dropzoneEventHandlers}
                      djsConfig={dropzoneJsConfig}
                    />
                </div>
                <Spacer />
            <h2>Privacy</h2>
                <div style={{textAlign: 'left'}}>
                    <Toggles />
                </div>
                <Spacer />
          </div>
		  )
	}

}

export default Settings
