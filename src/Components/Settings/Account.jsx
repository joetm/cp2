/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import AutoComplete from 'material-ui/AutoComplete'

import { findUser, changeSetting, fetchCountries, fetchStates, fetchCities } from '../../actions'
import SettingsSeparator from './SettingsSeparator'
import Alert from '../Shared/Alert'
import getSuccessMsg from '../../common/successMessages'
// import { usernames } from '../../common/blocklists/usernames'
import Spacer from '../Shared/Spacer'


class AccountSettings extends React.Component {
    unlockButton = null
    usernamePrimary = null
    usernameConfirmation = null
    state = {
      // fields
      usertitle: '',
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
    componentDidMount() {
      this.props.fetchCountries()
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
      this.setState({usertitle: newValue})
    }
    /*
     * Change the user title.
     */
    changeUsertitle = () => {
      const usertitle = this.state.usertitle.trim()
      // allow empty usertitles!
      this.props.changeSetting('usertitle', usertitle)
    }
    /*
     * Handle the change of the country selector.
     */
    handleChangeCountry = () => { // country
      // TODO
      // this.setState({ country })
      console.log('TODO')
    }
    /*
     * Handle the change of the state selector.
     */
    handleChangeState = () => { // event, key, state
      // TODO
      // this.setState({ state })
      console.log('TODO')
    }
    /*
     * Handle the change of the city selector.
     */
    handleChangeCity = () => { // event, key, city
      // TODO
      // this.setState({ city })
      console.log('TODO')
    }
    /*
     * Handle the change of the birthdate.
     */
    handleChangeBirthdate = (e, date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      this.props.changeSetting('birthday', `${year}-${month}-${day}`)
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
      const { birthday, country, state, city, usertitle } = this.props

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
        <div style={{textAlign: 'left'}}>

            <SettingsSeparator first text="Personal data" />

            <DatePicker
              floatingLabelText="Birth date"
              hintText="Your birth date"
              openToYearSelection={true}
              autoOk={true}
              value={birthday ? ( new Date(birthday) ) : null}
              onChange={this.handleChangeBirthdate}
            />

            <SettingsSeparator text="Location" />

            <AutoComplete
              floatingLabelText="Country"
              fullWidth={true}
              filter={AutoComplete.caseInsensitiveFilter}
              openOnFocus={false}
              onUpdateInput={this.handleChangeCountry}
              searchText={country}
              dataSource={this.props.countries}
              dataSourceConfig={{text: 'country', value: 'country'}}
            />

            <div>
                <SelectField
                  floatingLabelText="State"
                  fullWidth={true}
                  value={state}
                  onChange={this.handleChangeState}
                >
                  <MenuItem value="TODO1" primaryText="TODO1" />
                  <MenuItem value="TODO2" primaryText="TODO2" />
                  <MenuItem value="TODO3" primaryText="TODO3" />
                  <MenuItem value="TODO4" primaryText="TODO4" />
                  <MenuItem value="TODO5" primaryText="TODO5" />
                  <MenuItem value="Berlin" primaryText="Berlin" />
                </SelectField>
            </div>

            <div>
                <SelectField
                  floatingLabelText="City"
                  fullWidth={true}
                  value={city}
                  onChange={this.handleChangeCity}
                >
                  <MenuItem value="Aachen" primaryText="Aachen" />
                  <MenuItem value="Berlin" primaryText="Berlin" />
                  <MenuItem value="Frankfurt" primaryText="Frankfurt" />
                  <MenuItem value="Hamburg" primaryText="Hamburg" />
                  <MenuItem value="Munich" primaryText="Munich" />
                </SelectField>
            </div>

            <SettingsSeparator text="Account Details" />

            <TextField
              floatingLabelText="Custom User Title"
              value={this.state.usertitle || usertitle}
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
              You could lock yourself out if you forget any of the entered information!
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
    // currentUser
    usertitle: state.currentUser.usertitle,
    birthday: state.currentUser.birthday,
    username: state.currentUser.username,
    usertitle: state.currentUser.usertitle,
    //
    country: state.currentUser.country,
    state: state.currentUser.state,
    city: state.currentUser.city,
    // general
    countries: state.appState.countries,
    states: state.appState.states,
    cities: state.appState.cities,
    // TODO - get this from protected route
    email: state.currentUser.email,
})

export default connect(
    mapStateToProps,
    { findUser, changeSetting, fetchCountries, fetchStates, fetchCities }
)(AccountSettings)
