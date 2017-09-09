/** @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import ReCaptcha from 'react-google-recaptcha'

import Spacer from '../Shared/Spacer'
import Footer from '../Footer/'


/**
 * Contact class
 * @class
 */
class Contact extends React.Component {
    state = {
        selectedField: "suggestion",
    }
    handleChangeTypeOfContact = (event, index, value) => {
        this.setState({selectedField: value})
    }
    recaptchaSuccess = () => {
        console.log('recaptcha success')
    }
    /**
     * Render the component.
     */
    render() {
        return (
            <div style={{textAlign: 'center'}}>

                <Paper style={{padding: '2em', margin: '2em auto', maxWidth: '450px'}}>

                  <h1>Contact</h1>

                  <div>
                    <SelectField
                      floatingLabelText="Type of Contact"
                      value={this.state.selectedField}
                      onChange={this.handleChangeTypeOfContact}
                    >
                      <MenuItem value="suggestion" primaryText="Suggestion" />
                      <MenuItem value="complaint" primaryText="Complaint" />
                      <MenuItem value="dmca" primaryText="DMCA request" />
                    </SelectField>
                  </div>

                  <div>
                    <TextField
                      hintText="Subject"
                      multiLine={false}
                      floatingLabelText="Subject"
                    />
                  </div>

                  <div>
                    <TextField
                      hintText=""
                      multiLine={true}
                      floatingLabelText="Message Text"
                    />
                  </div>

                  <div style={{margin: '1em auto', display: 'inline-block'}}>
                      <ReCaptcha
                          ref="recaptcha"
                          sitekey="<client site key>"
                          onChange={this.recaptchaSuccess}
                      />
                  </div>

                  <div style={{margin: '1em'}}>
                    <RaisedButton label="Submit" secondary={true} />
                  </div>

                </Paper>

                <Spacer />

                <Footer />

            </div>
        )
    }
}

export default Contact
