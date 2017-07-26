/** @flow */

import React from 'react'
import Toggle from 'material-ui/Toggle'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import {Route, Link, Switch} from 'react-router-dom'

// dropzone css
import 'react-dropzone-component/styles/filepicker.css'
// import 'dropzone/dist/min/dropzone.css'
// dropzone component
import DropzoneComponent from 'react-dropzone-component/dist/react-dropzone'

// import ToolBar from './ToolBar.jsx'
import Avatar from './Avatar'
import Spacer from './Spacer'

const blockMaxWidth = '80%' // 250

const styles = {
  settingsBlock: {
    //display: 'flex',
    //flexWrap: 'wrap',
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



const AvatarDropzone = (props) => (
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
)

const ProfileImgDropzone = (props) => (
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
)

const privacySettings = (props) => (
    <div style={{textAlign: 'left'}}>
          <Divider />
          <List>
            <Subheader>Notifications</Subheader>
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
        </List>
    </div>
)


class Settings extends React.PureComponent {
  state = {
    selected: 0
  }
  selectProfileImg () {
    this.setState({selected: 1})
  }
  selectAvatar () {
    this.setState({selected: 2})
  }
  selectPrivacy () {
    this.setState({selected: 3})
  }
	render () {
		  return (
          <div style={{textAlign: 'center'}}>
            <h1>Settings</h1>

            <Link to={this.props.match.url + '/image'}>Profile Image</Link>
            <Link to={this.props.match.url + '/avatar'}>Avatar</Link>
            <Link to={this.props.match.url + '/privacy'}>Privacy</Link>

            <div style={styles.settingsBlock}>

                <List>
                    <ListItem
                      primaryText="Profile photo"
                      secondaryText="Change your profile photo"
                      style={{color: this.state.selected === 1 ? 'red' : '#000'}}
                      onTouchTap={this.selectProfileImg.bind(this)}
                    />
                    <ListItem
                      primaryText="Avatar"
                      secondaryText="Change your avatar photo"
                      style={{color: this.state.selected === 2 ? 'red' : '#000'}}
                      onTouchTap={this.selectAvatar.bind(this)}
                    />
                    <ListItem
                      primaryText="Privacy"
                      secondaryText="Change your privacy settings"
                      style={{color: this.state.selected === 3 ? 'red' : '#000'}}
                      onTouchTap={this.selectPrivacy.bind(this)}
                    />
                </List>

                <Switch>
                <Route path={this.props.match.url + '/image'} component={ProfileImgDropzone}/>
                <Route path={this.props.match.url + '/avatar'} component={AvatarDropzone}/>
                <Route path={this.props.match.url + '/privacy'} component={privacySettings}/>
                </Switch>

            </div>

            <Spacer />
          </div>
		  )
	}

}

export default Settings
