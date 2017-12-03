/** @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import ReCaptcha from 'react-google-recaptcha'
import ScrollToTop from '../Shared/ScrollToTop'

import Spacer from '../Shared/Spacer'
import Footer from '../Footer/'


const _FIELDS = {
  SUGGESTION: 'suggestion',
  COMPLAINT: 'complaint',
  DMCA: 'dmca',
  OTHER: 'other',
}

const _ERRORS = {
  subject: 'Subject cannot be blank.',
  message: 'Message cannot be blank.',
  dmca: 'You must provide at least one URL.',
}

const styles = {
  formContainer: {
    padding: '2em',
    margin: '2em auto',
    maxWidth: '550px',
  },
  reCaptchaContainer: {
    margin: '1em auto',
    textAlign: 'center',
    display: 'block',
  },
  submitButtonContainer: {
    margin: '1em 0',
  },
}


/**
 * Contact class
 * @class
 */
class Contact extends React.Component {
  state = {
    selectedField: "suggestion",
    isDMCA: false,
    // --
    subject: '',
    message: '',
    dmca: '',
    // --
    subjectError: null,
    messageError: null,
    dmcaError: null,
  }
  handleChangeTypeOfContact = (event, index, value) => {
    this.setState({
      selectedField: value,
      isDMCA: value === 'dmca',
    })
  }
  recaptchaSuccess = () => {
    console.log('recaptcha success')
  }
  handleFieldChange = (field, newValue) => {
    const fieldText = newValue.trim()
    const errorKey = `${field}Error`
    if (!fieldText.length) {
      this.setState({[field]: '', [errorKey]: _ERRORS[field]})
      return
    }
    this.setState({[field]: fieldText, [errorKey]: null})
  }
  handleChangeSubject = (event, newValue) => {
    this.handleFieldChange(_FIELDS.SUBJECT, newValue)
  }
  handleChangeMessage = (event, newValue) => {
    this.handleFieldChange(_FIELDS.MESSAGE, newValue)
  }
  handleChangeDmcaURLs = (event, newValue) => {
    this.handleFieldChange(_FIELDS.DMCA, newValue)
  }
  precheckForm = () => {
    // field checks
    if (!this.state.subject || !this.state.message) {
      console.log('must fill out all fields')
      return
    }
    // DMCA checking
    if (this.state.isDMCA) {
      console.log('Pre-processing DMCA request')
      if (!this.state.dmca) {
        this.setState({dmcaError: _ERRORS.DMCA})
      }
    }
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <ScrollToTop />

        <Paper style={styles.formContainer}>

          <h1>Contact</h1>

          <div>
            <SelectField
              floatingLabelText="Type of Contact"
              value={this.state.selectedField}
              onChange={this.handleChangeTypeOfContact}
              fullWidth={true}
            >
              <MenuItem value={_FIELDS.SUGGESTION} primaryText="Suggestion" selected={this.state.selectedField === _FIELDS.SUGGESTION} />
              <MenuItem value={_FIELDS.COMPLAINT} primaryText="Complaint" selected={this.state.selectedField === _FIELDS.COMPLAINT} />
              <MenuItem value={_FIELDS.DMCA} primaryText="DMCA request" selected={this.state.selectedField === _FIELDS.DMCA} />
              <MenuItem value={_FIELDS.OTHER} primaryText="Other" selected={this.state.selectedField === _FIELDS.OTHER} />
            </SelectField>
          </div>

          <TextField
            hintText="Subject"
            multiLine={false}
            fullWidth={true}
            floatingLabelText="Subject"
            onChange={this.handleChangeSubject}
          />

          {
            this.state.isDMCA &&
              <TextField
                hintText="Paste the URL(s), one per line"
                multiLine={true}
                errorText={this.state.dmcaError}
                rows={5}
                onChange={this.handleChangeDmcaURLs}
                fullWidth={true}
                floatingLabelText="URLs"
              />
          }

          <TextField
            multiLine={true}
            rows={5}
            fullWidth={true}
            floatingLabelText="Message Text"
            onChange={this.handleChangeMessage}
          />

          <div style={styles.reCaptchaContainer}>
              <ReCaptcha
                  sitekey="<client site key>"
                  onChange={this.recaptchaSuccess}
              />
          </div>

          <div style={styles.submitButtonContainer}>
            <RaisedButton
              label="Submit"
              secondary={true}
              onTouchTap={this.precheckForm}
            />
          </div>

        </Paper>

        <Spacer />

        <Footer />
      </div>
    )
  }
}

export default Contact
