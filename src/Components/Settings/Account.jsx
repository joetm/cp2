/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { findUser, changeSetting } from '../../actions'
import SettingsSeparator from './SettingsSeparator'
// import { inlineButton } from '../Shared/styles'
import Alert from '../Shared/Alert'
import getSuccessMsg from '../../common/successMessages'
import { usernames } from '../../common/blocklist'
import Spacer from '../Shared/Spacer'


class AccountSettings extends React.Component {
    unlockButton = null
    usernamePrimary = null
    usernameConfirmation = null
    constructor(props) {
      super(props)
      this.state = {
          // fields
          usertitle: null,
          email: '',
          confirmEmail: '',
          // locking
          fieldsLocked: true,
          deletionIsLocked: true,
          // match checking
          usernamesMatching: false,
          emailsMatching: false,
          passwordsMatching: false,
          // erorrs
          usernameError: null,
          emailError: null,
          confirmEmailError: null,
          passwordError: null,
          oldpasswordError: null,
          // snackbar alert
          alertIsOpen: false,
          alertMsg: getSuccessMsg(), // once per page load
          // dialogs
          deletionDialogIsOpen: false,
          usernameChangeDialogIsOpen: false,
      }
    }
    // TODO
    // componentWillMount() {
    //   const usertitle = this.props.usertitle
    //   console.log('usertitle', usertitle)
    //   this.setState({usertitle})
    // }
    /*
     * Handle the change of the username.
     */
    handleChangeUsername = () => {
      // reset errors
      this.setState({usernameError: null})
      // compare the two names
      const usernamePrimary = this.usernamePrimary.getValue().trim()
      const usernameConfirmation = this.usernameConfirmation.getValue()
      if (usernamePrimary !== '') {
        this.setState({usernamesMatching: usernamePrimary === usernameConfirmation})
      }
    }
    /*
     * Change the username.
     */
    changeUsername = () => {
      // must match and be > 0 length
      const newUsername = this.usernamePrimary.getValue().trim()
      if (!this.state.usernamesMatching || !newUsername.length) {
        return
      }
      this.props.findUser(newUsername).then(
        res => {
          if (res.response !== false) {
            // a user with this name was found
            this.setState({usernameError: 'Username already exists! Choose a different one.'})
            return false
          }
          console.log('change username', newUsername)
          this.props.changeSetting('username', newUsername)
          // close the dialog(s)
          this.closeDialogs()
          // show alert
          this.setState({alertIsOpen: true})
          // expected return
          return true
        }
      )
    }
    /*
     * Handle the change of the email.
     */
    handleChangeEmail = (e, newValue) => {
        // reset errors
        this.setState({emailError: null})
        // console.log('change email', newValue)
        const email = newValue.trim()
        if (email !== '') {
          this.setState({email})
        }
    }
    /*
     * Handle the change of the confirmation email.
     */
    handleChangeConfirmEmail = (e, newValue) => {
        // reset errors
        this.setState({confirmEmailError: null})
        // console.log('change confirmation email', newValue)
        const confirmEmail = newValue.trim()
        if (confirmEmail !== '') {
          this.setState({confirmEmail})
        }
    }
    /*
     * Handle the request for account deletion.
     */
    handleAccountDeletion = () => {
        if (this.state.deletionIsLocked) {
          return
        }
        this.closeDialogs()
        console.log('delete account')
    }
    /*
     * Handle the change of the user title field.
     */
    handleChangeUsertitle = (e, newValue) => {
      const usertitle = newValue.trim()
      // allow empty usertitles
      this.setState({usertitle})
    }
    /*
     * Change the user title.
     */
    changeUsertitle = () => {
      const usertitle = this.state.usertitle.trim()
      if (usertitle !== '') {
        this.props.changeSetting('usertitle', usertitle)
      }
    }
    /*
     * Enables the locked fields.
     */
    unlockAccountSettings = () => {
      this.setState({fieldsLocked: false})
      // remove the button
    }
    /*
     * Locks the account deletion button.
     */
    lockDeletion = () => {
      this.setState({
        deletionIsLocked: true,
        deletionDialogIsOpen: false,
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
     * Open the deletiondialog.
     */
    openDeletionDialog = () => {
      if (!this.state.fieldsLocked) {
        this.setState({deletionDialogIsOpen: true})
      }
    }
    /*
     * Open the username dialog.
     */
    openNameChangeDialog = () => {
      this.setState({usernameChangeDialogIsOpen: true})
    }
    /*
     * Close the dialogs.
     */
    closeDialogs = () => {
      this.setState({
        deletionDialogIsOpen: false,
        usernameChangeDialogIsOpen: false,
      })
    }
    /*
     * Close the alert.
     */
    closeAlert = () => this.setState({alertIsOpen: false})
    /*
     * Render the component.
     */
    render() {
      const { email } = this.props
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

            <SettingsSeparator first text="Account Details" />

            <TextField
              floatingLabelText="Custom User Title"
              value={this.state.usertitle}
              onChange={this.handleChangeUsertitle}
            />
            <p>
              <RaisedButton
                label="Save"
                primary={true}
                onTouchTap={this.changeUsertitle}
              />
            </p>

            <SettingsSeparator text="Login-related Options" />

            <p>
              Making changes to the fields below will affect the way you log into the site.
              You could for example lock yourself out if you forget any of the entered information!
            </p>
            <RaisedButton
              style={{display: this.state.fieldsLocked ? 'inline-block' : 'none'}}
              label="OK, let me change the settings!"
              onTouchTap={this.unlockAccountSettings}
              ref={el => { this.unlockButton = el }}
            />

            <SettingsSeparator text="Change Username" />

            <p>
              <RaisedButton
                  label="Change Username"
                  primary={true}
                  disabled={this.state.fieldsLocked}
                  onTouchTap={this.openNameChangeDialog}
              />
            </p>

            <div>
                <TextField
                  floatingLabelText="New Email"
                  disabled={this.state.fieldsLocked}
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
            </div>
            <div>
                <TextField
                  floatingLabelText="Confirm Email"
                  disabled={this.state.fieldsLocked}
                  value={this.state.confirmEmail}
                  onChange={this.handleChangeConfirmEmail}
                />
            </div>

            <p>
              <RaisedButton
                  label="Update Email"
                  primary={true}
                  disabled={this.state.fieldsLocked}
                  onTouchTap={() => { /* TODO */ }}
              />
            </p>

            <SettingsSeparator text="Password" />

            <div>
                <TextField
                  floatingLabelText="Old Password"
                  type="password"
                  disabled={this.state.fieldsLocked}
                  onBlur={this.handleChangePassword}
                  errorText={this.state.oldpasswordError}
                />
            </div>
            <div>
                <TextField
                  floatingLabelText="New Password"
                  type="password"
                  disabled={this.state.fieldsLocked}
                  onBlur={this.handleChangePassword}
                  errorText={this.state.passwordError}
                />
            </div>
            <div>
                <TextField
                  floatingLabelText="Confirm Password"
                  type="password"
                  disabled={this.state.fieldsLocked}
                  onBlur={this.handleChangePassword}
                  errorText={this.state.passwordError}
                />
            </div>

            <p>
              <RaisedButton
                  label="Change password"
                  primary={true}
                  disabled={this.state.fieldsLocked}
                  onTouchTap={() => { /* TODO */ }}
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
              open={this.state.deletionDialogIsOpen}
              onRequestClose={this.closeDialogs}
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

            <Dialog
              title="Change Username"
              actions={[
                <FlatButton
                  label="Cancel"
                  primary={true}
                  onClick={this.closeDialogs}
                />,
                <RaisedButton
                  label="Change Username"
                  primary={true}
                  disabled={!this.state.usernamesMatching}
                  onTouchTap={this.changeUsername}
                />,
              ]}
              modal={false}
              open={this.state.usernameChangeDialogIsOpen}
              onRequestClose={this.closeDialogs}
            >
              <div>
                <TextField
                  floatingLabelText="Enter new username"
                  ref={el => { this.usernamePrimary = el }}
                  onChange={this.handleChangeUsername}
                  errorText={this.state.usernameError}
                />
              </div>

              <div>
                <TextField
                  floatingLabelText="Confirm new username"
                  ref={el => { this.usernameConfirmation = el }}
                  onChange={this.handleChangeUsername}
                  errorText={this.state.usernameError}
                />
              </div>
            </Dialog>

            <Spacer />

            <Alert
              open={this.state.alertIsOpen}
              close={this.closeAlert}
              msg={this.state.alertMsg}
             />

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
    { findUser, changeSetting }
)(AccountSettings)
