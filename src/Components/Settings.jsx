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

const styles = {
  settingsBlock: {
    maxWidth: 250,
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


const ToggleExampleSimple = () => (
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
      label="Disabled"
      disabled={true}
      style={styles.toggle}
    />
    <Toggle
      label="Label on the right"
      labelPosition="right"
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

export default class Settings extends React.PureComponent {

	render () {
		  return (
          <div>
            <h1>Settings</h1>
            <Avatar />
            <DropzoneComponent
              style={styles.dropzone}
              config={dropzoneConfig}
              eventHandlers={dropzoneEventHandlers}
              djsConfig={dropzoneJsConfig} />
            <ToggleExampleSimple />
          </div>
		  )
	}

}
