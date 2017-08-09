/** @flow */

import React from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Spacer from '../Shared/Spacer'
import Footer from '../Footer/'


/**
 * Contact class
 * @class
 */
class Contact extends React.PureComponent {
    state = {
        selectedField: 1,
    }
    handleChange = (event, index, value) => this.setState({selectedField: value})
    /**
     * Render the component.
     */
    render() {
        return (
            <div style={{textAlign: 'center'}}>

                <h1>Contact</h1>

                <div>
                <TextField
                  hintText=""
                  floatingLabelText="Your Username"
                />
                </div>

                <div>
                <TextField
                  hintText=""
                  floatingLabelText="Your Email"
                />
                </div>

                <div>
                <SelectField
                  floatingLabelText="Type of Contact"
                  value={this.state.selectedField}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1} primaryText="Suggestion" />
                  <MenuItem value={2} primaryText="Complaint" />
                  <MenuItem value={3} primaryText="DMCA request" />
                </SelectField>
                </div>

                <div>
                <TextField
                  hintText=""
                  multiLine={true}
                  floatingLabelText="Message Text"
                />
                </div>

                <div style={{marginTop:'1em'}}>
                <RaisedButton label="Submit" secondary={true} />
                </div>

                <Spacer />

                <Footer />

            </div>
        )
    }
}

export default Contact
