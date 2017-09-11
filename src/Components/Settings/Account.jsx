/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import SettingsSeparator from './SettingsSeparator'


class AccountSettings extends React.Component {
    unlockButton = null
    state = {
        fieldsLocked: true,
        deletionIsLocked: true,
        dialogIsOpen: false,
    }
    componentDidMount() {
    }
    /*
     * Handle the change of the username.
     */
    handleChangeUsername = (e) => {
        console.log('change username', e.target.value)
    }
    /*
     * Handle the change of the email.
     */
    handleChangeEmail = (e) => {
        console.log('change email', e.target.value)
    }
    /*
     * Handle the request for account deletion.
     */
    handleAccountDeletion = () => {
        if (this.state.deletionIsLocked) {
          return
        }
        this.closeDeletionDialog()
        console.log('delete account')
    }
    /*
     * Handle the change of the user title field.
     */
    handleChangeUsertitle = (e) => {
        console.log('change user title', e.target.value)
    }
    /*
     * Enables the locked fields.
     */
    unlockAccountSettings = () => {
      this.setState({
        fieldsLocked: false,
      })
      // remove the button
    }
    /*
     * Locks the account deletion button.
     */
    lockDeletion = (e, newValue) => {
      this.setState({
        deletionIsLocked: true,
        dialogIsOpen: false,
      })
    }
    /*
     * Unlocks the account deletion button.
     */
    unlockDeletion = (e, newValue) => {
      if (newValue === this.props.username) {
        this.setState({deletionIsLocked: false})
        console.log('all safeties are off!')
      }
    }
    /*
     * Open the deletiondialog
     */
    openDeletionDialog = () => {
      if (!this.state.fieldsLocked) {
        this.setState({dialogIsOpen: true})
      }
    }
    closeDeletionDialog = () => {
      this.setState({dialogIsOpen: false})
    }
    /*
     * Render the component.
     */
    render() {
      const { usertitle, email, username } = this.props
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.lockDeletion}
        />,
        <RaisedButton
          label="Delete"
          secondary={true}
          keyboardFocused={false}
          disabled={this.state.deletionIsLocked}
          onTouchTap={this.handleAccountDeletion}
        />,
      ]
      return (
        <div style={{textAlign: 'left'}} ref="pageContent">

            <SettingsSeparator text="Account Details" />

            <TextField
              floatingLabelText="Custom User Title"
              value={usertitle}
              onBlur={this.handleChangeUsertitle}
            />
            <RaisedButton
                label="Save"
                primary={true}
                style={{display: 'inline-block'}}
                onTouchTap={() => {/* TODO */}}
            />

            <SettingsSeparator text="Login-related Options" />

            <p>
              Making changes to the fields below will affect the way you log into the site.
              This means you could lock yourself out if you forget any of the entered information.
              <div>
                <RaisedButton
                  style={{display: this.state.fieldsLocked ? 'inline-block' : 'none'}}
                  label="OK, let me change them!"
                  onTouchTap={this.unlockAccountSettings}
                  ref={(el) => {this.unlockButton = el}}
                />
              </div>
            </p>

            <SettingsSeparator text="Change Username" />

            <p>
              <RaisedButton
                  label="Change Username"
                  primary={true}
                  disabled={this.state.fieldsLocked}
                  onTouchTap={() => {/* TODO: Open another Dialog with username field */}}
              />
            </p>

            <div>
              <TextField
                floatingLabelText="Change Email"
                value={email}
                disabled={this.state.fieldsLocked}
                onBlur={this.handleChangeEmail}
              />

              <TextField
                floatingLabelText="Confirm Email"
                value={email}
                disabled={this.state.fieldsLocked}
                onBlur={this.handleChangeEmail}
              />
            </div>

            <p>
              <RaisedButton
                  label="Update Email"
                  primary={true}
                  disabled={this.state.fieldsLocked}
                  onTouchTap={() => {/* TODO */}}
              />
            </p>

            <SettingsSeparator text="Password" />

            <div>
              <TextField
                floatingLabelText="Old Password"
                type="password"
                disabled={this.state.fieldsLocked}
                onBlur={this.handleChangePassword}
              />
              <TextField
                floatingLabelText="New Password"
                type="password"
                disabled={this.state.fieldsLocked}
                onBlur={this.handleChangePassword}
              />
              <TextField
                floatingLabelText="Confirm Password"
                type="password"
                disabled={this.state.fieldsLocked}
                onBlur={this.handleChangePassword}
              />
            </div>

            <p>
              <RaisedButton
                  label="Change password"
                  primary={true}
                  disabled={this.state.fieldsLocked}
                  onTouchTap={() => {/* TODO */}}
              />
            </p>

            <SettingsSeparator text="Danger Zone" />

            <p>
              <RaisedButton
                  label="Delete Account"
                  secondary={true}
                  disabled={this.state.fieldsLocked}
                  onTouchTap={this.openDeletionDialog}
              />
            </p>

            <Dialog
              title="[DANGER] Account Deletion!"
              actions={actions}
              modal={false}
              open={this.state.dialogIsOpen}
              onRequestClose={this.handleClose}
            >
              <p>
              Warning: The account deletion cannot be undone!
              <br />
              Important: Your uploaded images, videos and posts will NOT automatically be deleted with your account.
              If you want them deleted, then do so yourself BEFORE deleting your account!
              </p>

              <div>
                To confirm the deletion, enter your username.
                <div>
                <TextField
                  floatingLabelText="Enter username"
                  onChange={this.unlockDeletion}
                />
                </div>
              </div>

            </Dialog>

        </div>
      )
    }
}


const mapStateToProps = (state) => ({
    username: state.currentUser.username,
    usertitle: state.currentUser.usertitle,
    // TODO - get this from protected route
    email: state.currentUser.email,
})

export default connect(
    mapStateToProps,
    {  }
)(AccountSettings)
